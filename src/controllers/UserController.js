const BaseController = require('./BaseController');
const UserService = require('../services/UserService');

class UserController extends BaseController {
  constructor(entity) {
    super(entity);
  }
}

module.exports = UserController;
