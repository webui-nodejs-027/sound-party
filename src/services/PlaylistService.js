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
}

inversify.decorate(inversify.injectable(), PlaylistService);
inversify.decorate(
  inversify.inject(TYPES.PlaylistRepository),
  PlaylistService,
  0,
);

module.exports = PlaylistService;
