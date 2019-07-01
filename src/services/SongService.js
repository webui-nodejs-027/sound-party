/* eslint-disable class-methods-use-this */
const fs = require('fs-extra');
const path = require('path');
const inversify = require('inversify');
const { TYPES } = require('../constants');
const BaseService = require('./BaseService');
const { AppError } = require('../middlewares/ErrorHandlers');

class SongService extends BaseService {
  async getAllData(query) {
    const take = query.limit || 10;
    const skip = take * (query.page - 1) || 0;
    let sortBy = null;
    const orderBy = query.order || 'ASC';
    let data = null;
    let dataCount = null;

    if (query.sortBy === 'authorName') {
      sortBy = 'author.name';
    } else if (query.sortBy === 'songName') {
      sortBy = 'song.name';
    } else if (query.sortBy === 'genre') {
      sortBy = 'genre.name';
    } else if (query.sortBy === 'year') {
      sortBy = 'song.year';
    } else if (query.sortBy === 'id') {
      sortBy = 'song.id';
    }

    if (query.searchSong) {
      data = await this.repository
        .createQueryBuilder('song')
        .select('DISTINCT song.name')
        .where('LOWER(song.name) LIKE LOWER(:name)', {
          name: `${query.searchSong}%`,
        })
        .take(take)
        .getRawMany();
    } else if (query.songName) {
      [data, dataCount] = await this.repository
        .createQueryBuilder('song')
        .innerJoinAndSelect('song.authorId', 'author', 'song.name = :name', {
          name: query.songName,
        })
        .innerJoinAndSelect('song.genreId', 'genre')
        .orderBy(sortBy, orderBy)
        .take(take)
        .skip(skip)
        .getManyAndCount();
    } else if (query.authorName) {
      [data, dataCount] = await this.repository
        .createQueryBuilder('song')
        .innerJoinAndSelect('song.authorId', 'author', 'author.name = :name', {
          name: query.authorName,
        })
        .innerJoinAndSelect('song.genreId', 'genre')
        .orderBy(sortBy, orderBy)
        .take(take)
        .skip(skip)
        .getManyAndCount();
    } else if (query.genre) {
      [data, dataCount] = await this.repository
        .createQueryBuilder('song')
        .innerJoinAndSelect('song.authorId', 'author')
        .innerJoinAndSelect('song.genreId', 'genre', 'genre.name = :name', {
          name: query.genre,
        })
        .orderBy(sortBy, orderBy)
        .take(take)
        .skip(skip)
        .getManyAndCount();
    } else {
      [data, dataCount] = await this.repository
        .createQueryBuilder('song')
        .innerJoinAndSelect('song.authorId', 'author')
        .innerJoinAndSelect('song.genreId', 'genre')
        .orderBy(sortBy, orderBy)
        .take(take)
        .skip(skip)
        .getManyAndCount();
    }

    return {
      page: parseInt(query.page, 10) || 1,
      limit: parseInt(query.limit, 10) || 10,
      total: dataCount,
      data,
    };
  }

  async checkNameSong(data) {
    const result = await this.repository.findOne({ where: data });
    if (result) {
      throw new AppError('Song exists', 400);
    }
  }

  async checkIdSongSrc(id, source) {
    const result = await this.repository.findOne({ where: { id } });
    if (!result) {
      this.deleteSong({ source });
      throw new AppError(`Data with  id = ${id}  not found`, 400);
    }
  }

  async deleteSong(data) {
    const { source } = data;
    const folder = path.join(__dirname, '../../music');
    const delSource = path.join(folder, source);
    const exists = await fs.pathExists(delSource);
    if (!exists) {
      throw new AppError('File not found', 400);
    } else {
      await fs.remove(delSource);
    }
  }
}

inversify.decorate(inversify.injectable(), SongService);
inversify.decorate(inversify.inject(TYPES.SongRepository), SongService, 0);

module.exports = SongService;
