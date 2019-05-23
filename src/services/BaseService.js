const { getRepository } = require('typeorm');
const services = require('./../data');

class BaseService {
  constructor(entity) {
    this.entity = entity;
    this.services = services;
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
      .output(Object.getOwnPropertyNames(this.entity.options.columns))
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
}

console.log('Base service');
console.log(BaseService);
module.exports = BaseService;
