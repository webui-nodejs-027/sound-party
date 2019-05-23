const BaseController = require('./BaseController');
const UserService = require('../services/UserService');
const User = require('../db/schemas/UserSchema');

class UserController extends BaseController {
  // eslint-disable-next-line no-useless-constructor
  constructor(entity, service) {
    super(entity, service);
  }
}

module.exports = new UserController(User, UserService);
