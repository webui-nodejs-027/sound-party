const { getRepository } = require('typeorm');

class BaseService {
  constructor(entity) {
    this.entity = entity;
  }

  async getAllData() {
    return getRepository(this.entity)
      .createQueryBuilder()
      .getMany();
  }

  async getDataById(id) {
    return getRepository(this.entity)
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
  }
}

module.exports = BaseService;
