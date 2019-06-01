const inversify = require('inversify');
const { AppError } = require('../middlewares/ErrorHandlers');

class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAllData(query) {
    const data = await this.repository.find(query);
    if (!data) {
      throw new AppError('Data not found');
    }
    return data;
  }

  async getById(id) {
    const data = await this.repository.findOne({ where: { id } });
    if (!data) {
      throw new AppError(`Data with  id = ${id}  not found`);
    }
    return data;
  }

  async insertData(content) {
    const data = await this.repository.save(content);
    if (!data) {
      throw new AppError('Add error');
    }
    return data;
  }

  async deleteById(id) {
    const data = await this.repository.delete(id);
    if (!data.affected) {
      throw new AppError(`Delete error ${id}`);
    }
    return data;
  }

  async updateById(id, content) {
    const data = await this.repository
      .createQueryBuilder()
      .update()
      .set(content)
      .where('id=:id', { id })
      .returning('*')
      .execute();
    if (!data) {
      throw new AppError('Update error');
    }
    return data;
  }
}

inversify.decorate(inversify.injectable(), BaseService);

module.exports = BaseService;
