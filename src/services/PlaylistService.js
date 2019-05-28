const playlistShema = require('./../db/schemas/PlaylistSchema');
const BaseService = require('./BaseService');
// eslint-disable-next-line import/order
const { getRepository } = require('typeorm');

class PlaylistService extends BaseService {
  // eslint-disable-next-line no-useless-constructor
  constructor(entity) {
    super(entity);
  }

  async getAllDataByUserId(userId) {
    return getRepository(this.entity)
      .createQueryBuilder(`${this.entity.name}`)
      .where(`${this.entity.name}.userId = :userId`, { userId })
      .getMany();
  }

  async getByIdUserAndIdPlaylist(id, userId) {
    return getRepository(this.entity)
      .createQueryBuilder(`${this.entity.name}`)
      .where(`${this.entity.name}.id = :id`, { id })
      .andWhere(`${this.entity.name}.userId = :userId`, { userId })
      .getOne();
  }

  async createPlaylist(data) {
    return getRepository(this.entity)
      .createQueryBuilder()
      .insert()
      .into(this.entity)
      .values(data)
      .execute();
  }

  async updatePlaylist(data, id) {
    return getRepository(this.entity)
      .createQueryBuilder()
      .update(this.entity)
      .set(data)
      .where('id = :id', { id })
      .execute();
  }
}

module.exports = new PlaylistService(playlistShema);
