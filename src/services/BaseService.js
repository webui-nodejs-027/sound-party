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
    console.log(this.entity.name);
    return getRepository(this.entity)
      .createQueryBuilder(this.entity.name)
      .where(`${this.entity}.id = :id`, {id : id })
      .getOne();
  }
}

module.exports = BaseService;
