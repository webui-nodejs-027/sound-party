const inversify = require('inversify');
const { TYPES } = require('../constants');
const BaseService = require('./BaseService');

class PlaylistService extends BaseService {
  constructor(repository, songRepository) {
    super(repository);
    this.songRepository = songRepository;
  }

  async getAllDataByUserId(userId) {
    return this.repository.find({ where: { userId } });
  }

  async getByIdUserAndIdPlaylist(id, userId) {
    return this.repository.findOne({ where: { id, userId } });
  }

  async addSongToPlaylist(id, songId) {
    const playlist = await this.repository.findOne({ where: { id } });
    const song = await this.songRepository.findOne({ where: { songId } });
    playlist.songs = [];
    playlist.songs.push(song);
    return this.repository.save(playlist);
  }
}

inversify.decorate(inversify.injectable(), PlaylistService);
inversify.decorate(
  inversify.inject(TYPES.PlaylistRepository),
  PlaylistService,
  0,
);
inversify.decorate(
  inversify.inject(TYPES.SongRepository),
  PlaylistService,
  1,
);

module.exports = PlaylistService;
