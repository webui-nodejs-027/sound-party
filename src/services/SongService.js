/* eslint-disable no-useless-constructor */
const { getConnection } = require('typeorm');
const BaseService = require('./BaseService');
const songShema = require('./../db/schemas/SongSchema');

class SongService extends BaseService {
  constructor(entity) {
    super(entity);
  }

  async insertSong(data) {
    return getConnection()
      .createQueryBuilder()
      .insert()
      .into(this.entity)
      .values(data)
      .returning('*')
      .execute();
  }

  async changeSong(data, id) {
    return getConnection()
      .createQueryBuilder()
      .update(this.entity)
      .set(data)
      .where('id = :id', { id })
      .returning('*')
      .execute();
  }
}

module.exports = new SongService(songShema);
