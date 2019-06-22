const inversify = require('inversify');
const { AppError } = require('../middlewares/ErrorHandlers');

class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAllData(query) {
    let page = 1;
    let limit = 10;
    const findOptions = {
      where: {},
      order: {},
      take: limit,
      skip: 0,
    };

    if (query !== undefined) {
      const emptyObject = Object.keys(query).length;
      if (emptyObject !== 0) {
        const queryParams = Object.entries(query);
        queryParams.forEach((elem) => {
          if (elem[0] in this.repository.metadata.propertiesMap) {
            [, findOptions.where[elem[0]]] = elem;
          }
        });
        findOptions.take = query.limit || 10;
        findOptions.skip = findOptions.take * (query.page - 1) || 0;
        if (query.sortBy) {
          findOptions.order[`${query.sortBy}`] = query.order || 'ASC';
        }
        if (query.page) {
          page = parseInt(query.page, 10);
        }
        if (query.limit) {
          limit = parseInt(query.limit, 10);
        }
      }
    }
    const [data, dataCount] = await this.repository.findAndCount(findOptions);
    return {
      page,
      limit,
      total: dataCount,
      data,
    };
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
