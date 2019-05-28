const inversify = require('inversify');
const { TYPES } = require('../constants');
const BaseService = require('./BaseService');

class UserService extends BaseService {
  getUserByEmail(email) {
    return this.repository
      .createQueryBuilder(`${this.entity.name}`)
      .where('email = :email', { email })
      .getOne();
  }
}

inversify.decorate(inversify.injectable(), UserService);
inversify.decorate(inversify.inject(TYPES.UserRepository), UserService, 0);

module.exports = UserService;
