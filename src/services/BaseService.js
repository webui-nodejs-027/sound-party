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

  async updateDataById(id, content) {
    return getRepository(this.entity)
      .createQueryBuilder()
      .update(this.entity.options.name)
      .set(content)
      .where('id = :id', { id })
      .execute();
  }

  async deleteDataById(id) {
    return getRepository(this.entity)
      .createQueryBuilder()
      .delete()
      .from(this.entity.options.name)
      .where('id = :id', { id })
      .execute();
  }
}

module.exports = BaseService;
