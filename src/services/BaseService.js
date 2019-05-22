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

  async addData(content) {
    return getRepository(this.entity)
      .createQueryBuilder()
      .insert()
      .into(this.entity.options.name)
      .values(content)
      .execute();
  }
}

module.exports = BaseService;
