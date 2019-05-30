/* eslint-disable no-param-reassign */
const inversify = require('inversify');
const bcrypt = require('./BcService');
const { TYPES } = require('../constants');
const { AppError } = require('../middlewares/ErrorHandlers');
const BaseService = require('./BaseService');
const mailer = require('./MailerService');

class UserService extends BaseService {
  getUserByEmail(email) {
    return this.repository.findOne({ email });
  }

  async insertUserData(content) {
    content.password = await bcrypt.hashPassword(content.password);
    return this.repository.save(content);
  }

  async mailCheck(email) {
    const user = await this.getUserByEmail(email);
    if (user) {
      throw new AppError('This email is already taken', 400);
    }
    return { message: 'ok' };
  }

  async sendConfirm(id) {
    const user = await this.getById(id);
    if (!user) {
      throw new AppError('There are is no user with such id', 400);
    }
    return mailer.sendConfirmation(user.id, user.email);
  }

  async userConfirm(token) {
    try {
      const decodedToken = mailer.verifyToken(token);
      await this.updateById(decodedToken.id, { roleId: 1 });
    } catch (e) {
      throw new AppError(e.message, 400);
    }
    return { message: 'Email confirmed' };
  }
}

inversify.decorate(inversify.injectable(), UserService);
inversify.decorate(inversify.inject(TYPES.UserRepository), UserService, 0);

module.exports = UserService;
