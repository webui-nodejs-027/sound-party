const inversify = require('inversify');
const { TYPES } = require('../constants');
const BaseService = require('./BaseService');
const { AppError } = require('../middlewares/ErrorHandlers');

class PlaylistService extends BaseService {
  constructor(repository, songRepository) {
    super(repository);
    this.songRepository = songRepository;
  }

  async getAllDataByUserId(id) {
    const data = this.repository.find({
      where: { userId: id },
      order: { isMain: 'DESC' },
    });
    if (!data) {
      throw new AppError('Cannot find userId', 400);
    }
    return data;
  }

  async getByIdUserAndIdPlaylist(id, userId) {
    const data = this.repository.findOne({
      where: {
        id,
        userId,
      },
    });
    if (!data) {
      throw new AppError('Cannot find playlist or user', 400);
    }
    return data;
  }

  async getAllSongsFromPlaylist(id, query) {
    const take = query.limit || 10;
    const skip = take * (query.page - 1) || 0;
    let data = [];

    const dataSongs = await this.repository
      .createQueryBuilder('playlist')
      .innerJoinAndSelect('playlist.songs', 'song')
      .innerJoinAndSelect('song.authorId', 'author')
      .innerJoinAndSelect('song.genreId', 'genre')
      .where('playlist.id = :id', { id })
      .take(take)
      .skip(skip)
      .getMany();
    if (dataSongs.length > 0) {
      data = dataSongs[0].songs;
    }
    return {
      page: parseInt(query.page, 10) || 1,
      limit: parseInt(query.limit, 10) || 10,
      total: data.length,
      data,
    };
  }

  async addSongToPlaylist(id, songId) {
    const song = await this.songRepository.findOne(songId);
    const playlist = await this.repository.find({
      where: { id },
      relations: ['songs'],
    });
    const idsOfSongs = playlist[0].songs.map(item => item.id);

    if (!playlist) {
      throw new AppError(`There is not playlist with id ${id}`, 400);
    }
    if (!song) {
      throw new AppError(`There is not song with id ${songId}`, 400);
    }

    if (idsOfSongs.indexOf(song.id) === -1) {
      playlist[0].songs.push(song);
    } else {
      throw new AppError('Song already exists in playlist', 400);
    }
    return this.repository.save(playlist);
  }

  async removeSongFromPlaylist(id, songId) {
    const playlist = await this.repository
      .createQueryBuilder('playlist')
      .innerJoinAndSelect('playlist.songs', 'song')
      .innerJoinAndSelect('song.authorId', 'author')
      .innerJoinAndSelect('song.genreId', 'genre')
      .where('playlist.id = :id', { id })
      .getMany();
    const song = await this.songRepository.findOne(songId);
    const idsOfSongs = playlist[0].songs.map(item => item.id);
    if (!playlist) {
      throw new AppError(`There is not playlist with id ${id}`, 400);
    }
    if (!song) {
      throw new AppError(`There is not song with id ${songId}`, 400);
    }
    if (idsOfSongs.indexOf(song.id) > -1) {
      playlist[0].songs = playlist[0].songs.filter(
        value => value.id !== song.id,
      );
    } else {
      throw new AppError(
        `Song ${songId} does not exist in playlist ${id}`,
        400,
      );
    }
    return this.repository.save(playlist);
  }
}

inversify.decorate(inversify.injectable(), PlaylistService);
inversify.decorate(
  inversify.inject(TYPES.PlaylistRepository),
  PlaylistService,
  0,
);
inversify.decorate(inversify.inject(TYPES.SongRepository), PlaylistService, 1);

module.exports = PlaylistService;
