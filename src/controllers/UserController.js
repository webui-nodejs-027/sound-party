const BaseController = require('./BaseController');
const UserService = require('../services/UserService');
const User = require('../db/schemas/UserSchema');

class UserController extends BaseController {
  constructor(entity, service) {
    super(entity, service);
  }
}

module.exports = new UserController(User, UserService);
