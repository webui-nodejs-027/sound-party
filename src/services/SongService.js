const { getConnection } = require('typeorm');
const BaseService = require('./BaseService');

class SongService extends BaseService {
  constructor(entity) {
    super(entity);
    this.entity = entity;
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

module.exports = SongService;
