const inversify = require('inversify');
const { TYPES } = require('../constants');
const BaseService = require('./BaseService');

class PlaylistService extends BaseService {
  async getAllDataByUserId(userId) {
    return this.repository
      .createQueryBuilder(`${this.entity.name}`)
      .where(`${this.entity.name}.userId = :userId`, { userId })
      .getMany();
  }

  async getByIdUserAndIdPlaylist(id, userId) {
    return this.repository
      .createQueryBuilder(`${this.entity.name}`)
      .where(`${this.entity.name}.id = :id`, { id })
      .andWhere(`${this.entity.name}.userId = :userId`, { userId })
      .getOne();
  }

  async createPlaylist(name, favourite, userId, isMain) {
    return this.repository
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
    return this.repository
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

inversify.decorate(inversify.injectable(), PlaylistService);
inversify.decorate(
  inversify.inject(TYPES.PlaylistRepository),
  PlaylistService,
  0,
);

module.exports = PlaylistService;
