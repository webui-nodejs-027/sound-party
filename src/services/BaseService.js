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

  async deleteById(id) {
    return getRepository(this.entity)
      .createQueryBuilder()
      .delete()
      .from(this.entity)
      .where('id = :id', { id })
      .execute();
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
      .update(this.entity)
      .set(content)
      .where('id = :id', { id })
      .execute();
  }
}

module.exports = BaseService;
