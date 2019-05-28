/* eslint-disable no-useless-constructor,class-methods-use-this,no-shadow,consistent-return */
const passport = require('passport');
const BaseController = require('./BaseController');
const { container } = require('../ioc');
const { TYPES } = require('../constants');

class UserController extends BaseController {
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
    const result = await this.service.insertData(req.body);
    res.send(result);
  }
}

module.exports = new UserController(container.get(TYPES.UserService));
