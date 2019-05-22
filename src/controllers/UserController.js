const BaseController = require('./BaseController');
const UserService = require('../services/UserService');
const User = require('../db/schemas/UserSchema');

class UserController extends BaseController {
  constructor(entity, service) {
    super(entity, service);
  }

  async createUser(req, res) {
    const user = await this.service.createUser(req.body.firstName,
      req.body.lastName, req.body.email, req.body.password, req.body.birthday,
      req.body.gender, req.body.socialLink, req.body.roleId);
    console.log(user);
    res.status(200).json(user);
  }

  async updateUser(req, res) {
    const updatedUser = await this.service.updateUser(req.body.firstName,
      req.body.lastName, req.body.email, req.body.birthday,
      req.body.gender, req.body.socialLink, req.params.id);
    console.log(updatedUser);
    res.status(200).json(updatedUser);
  }
}

module.exports = new UserController(User, UserService);
