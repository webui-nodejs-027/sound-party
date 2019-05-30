/* eslint-disable no-param-reassign */
const inversify = require('inversify');
const bcrypt = require('./BcService');
const { TYPES } = require('../constants');
const BaseService = require('./BaseService');

class UserService extends BaseService {
  getUserByEmail(email) {
    return this.repository.findOne({ email });
  }

  async insertUserData(content) {
    content.password = await bcrypt.hashPassword(content.password);
    return this.repository.save(content);
  }
}

inversify.decorate(inversify.injectable(), UserService);
inversify.decorate(inversify.inject(TYPES.UserRepository), UserService, 0);

module.exports = UserService;
