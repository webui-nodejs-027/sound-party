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

  async createPlaylist(name, favourite, userId, isMain) {
    return getRepository(this.entity)
      .createQueryBuilder()
      .insert()
      .into(this.entity)
      .values([
        {
          name,
          favourite,
          userId,
          isMain,
        },
      ])
      .execute();
  }

  async updatePlaylist(name, favourite, id) {
    return getRepository(this.entity)
      .createQueryBuilder()
      .update(this.entity)
      .set({
        name,
        favourite,
      })
      .where('id = :id', { id })
      .execute();
  }
}

module.exports = PlaylistService;
