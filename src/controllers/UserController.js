const ClientController = require("./ClientController");
const UserService = require("../services/UserService");

class UserController extends ClientController {
  constructor(entity) {
    super(entity);
  }
}

module.exports = UserController;
