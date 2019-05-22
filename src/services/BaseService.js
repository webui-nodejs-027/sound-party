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

  async getById(id) {
    return getRepository(this.entity)
      .createQueryBuilder(`${this.entity.name}`)
      .where(`${this.entity.name}.id = :id`, { id })
      .getOne();
  }
}

module.exports = BaseService;
