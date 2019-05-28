const inversify = require('inversify');

class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  getAllData() {
    return this.repository.find();
  }

  getById(id) {
    return this.repository.findOne({ where: { id } });
  }

  insertData(content) {
    return this.repository.save(content);
  }

  deleteById(id) {
    return this.repository.delete(id);
  }

  updateById(id, content) {
    // return this.repository.update(id, content);
    return this.repository.createQueryBuilder()
      .update()
      .set(content)
      .where('id=:id', { id })
      .returning('*')
      .execute();
  }
}

inversify.decorate(inversify.injectable(), BaseService);

module.exports = BaseService;
