const passport = require('passport');
const BaseController = require('./BaseController');
const userService = require('../services/UserService');

class UserController extends BaseController {
  constructor(service) {
    super(service);
  }

  async login(req, res, next) {
    passport.authenticate('local', (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.send('User doesnt found ');
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect(`/api/users/${user.id}`);
      });
    })(req, res, next);
  }

  async addUser(req, res) {
    // req.body.password = await UserShema.hashPassword(req.body.password);
    const data = req.body;
    data.password = await UserShema.hashPassword(req.body.password);
    const {
      firstname,
      lastname,
      email,
      password,
      birthday,
      gender,
      socialLink,
      roleId,
    } = data;
    const user = new UserShema.User(firstname, lastname, email,
      password, birthday, gender, socialLink, roleId);
    const result = await this.service.addData(user);
    res.send(result);
  }
}

module.exports = new UserController(userService);
