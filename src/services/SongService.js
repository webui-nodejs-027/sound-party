/* eslint-disable class-methods-use-this */
const fs = require('fs');
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
    }

    if (query.songName) {
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

  async checkNameSong(name, authorId) {
    const result = await this.repository.findOne({ where: { name, authorId } });
    if (result) {
      throw new AppError('Song exists', 400);
    }
  }

  async checkIdSongSrc(id, source) {
    const result = await super.getById(id);
    if (!result) {
      fs.unlink(source, (err) => {
        if (err) {
          throw new AppError('File not found', 400);
        }
      });
      throw new AppError("ID doesn't exists", 400);
    }
  }

  async checkIdSong(id) {
    const result = await super.getById(id);
    if (!result) {
      throw new AppError("ID doesn't exists", 400);
    }
  }

  deleteSong(data) {
    const { source } = data;
    const folder = path.join(__dirname, '../../music');
    const delSource = path.join(folder, source);
    fs.unlink(delSource, (err) => {
      if (err) {
        throw new AppError('File not found', 400);
      }
    });
  }
}

inversify.decorate(inversify.injectable(), SongService);
inversify.decorate(inversify.inject(TYPES.SongRepository), SongService, 0);

module.exports = SongService;
