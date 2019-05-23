const { getRepository } = require('typeorm');
const BaseService = require('./BaseService');


class UserService extends BaseService {
  constructor(entity) {
    super(entity);
  }

  async getUserByEmail(email) {
    return getRepository(this.entity)
      .createQueryBuilder(`${this.entity.name}`)
      .where('email = :email', { email })
      .getOne();
  }
}

module.exports = UserService;
