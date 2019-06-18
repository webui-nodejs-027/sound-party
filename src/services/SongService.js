/* eslint-disable class-methods-use-this */
const fs = require('fs');
const inversify = require('inversify');
const { TYPES } = require('../constants');
const BaseService = require('./BaseService');
const { AppError } = require('../middlewares/ErrorHandlers');

class SongService extends BaseService {
  async checkNameSong(name, authorId) {
    const result = await this.repository.findOne({ where: { name, authorId } });
    if (result) {
      throw new AppError('Song exists', 400);
    }
  }

  async checkIdSongSrc(id, source) {
    const result = await super.getById(id);
    if (!result) {
      fs.unlink(source, err => {
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
    fs.unlink(source, err => {
      if (err) {
        throw new AppError('File not found', 400);
      }
    });
  }
}

inversify.decorate(inversify.injectable(), SongService);
inversify.decorate(inversify.inject(TYPES.SongRepository), SongService, 0);

module.exports = SongService;
