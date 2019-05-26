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
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
  }

  async insertData(content) {
    return getRepository(this.entity)
      .createQueryBuilder()
      .insert()
      .into(this.entity.options.name)
      .values(content)
      .execute();
  }

  async deleteById(id) {
    return getRepository(this.entity)
      .createQueryBuilder()
      .delete()
      .from(this.entity.options.name)
      .where('id = :id', { id })
      .execute();
  }

  async updateDataById(id, content) {
    return getRepository(this.entity)
      .createQueryBuilder()
      .update(this.entity.options.name)
      .set(content)
      .where('id = :id', { id })
      .output(Object.getOwnPropertyNames(this.entity.options.columns))
      .execute();
  }
}

module.exports = BaseService;
