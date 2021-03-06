/* eslint-disable no-useless-constructor,class-methods-use-this,no-shadow,consistent-return */
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../constants');
const BaseController = require('./BaseController');
const { container } = require('../ioc');
const { TYPES } = require('../constants');

class UserController extends BaseController {
  async login(req, res, next) {
    passport.authenticate('local', { session: false }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.send('User doesnt found ');
      }
      req.logIn(user, { session: false }, (err) => {
        if (err) {
          return next(err);
        }
        const payLoad = {
          id: user.id,
          roleId: user.roleId,
        };
        const token = jwt.sign(payLoad, SECRET, {
          expiresIn: '24h',
        });
        return res.json({
          succes: true,
          message: 'Authentication succesful',
          token,
        });
      });
    })(req, res, next);
  }

  async addUser(req, res) {
    const result = await this.service.insertUserData(req.body);
    const { password, ...user } = result;
    res.json(user);
  }

  async getUser(req, res) {
    const result = await this.service.getById(req.params.id);
    const { password, ...user } = result;
    res.json(user);
  }

  async getUsers(req, res) {
    const result = await this.service.getAllData();
    const users = result.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    res.send(users);
  }

  async subscribeOnMeeting(req, res) {
    const result = await this.service.subscribeOnMeeting(req);
    res.json(result);
  }

  async changePassword(req, res) {
    const result = await this.service.changePassword(
      req.body.id,
      req.body.oldpassword,
      req.body.password,
    );
    res.json(result);
  }

  async mailCheck(req, res) {
    const { email } = req.body;
    const result = await this.service.mailCheck(email);
    res.json(result);
  }

  async sendConfirm(req, res) {
    const { id } = req.body;
    const result = await this.service.sendConfirm(id);
    res.json(result);
  }

  async userConfirm(req, res) {
    const { token } = req.params;
    const result = await this.service.userConfirm(token);
    res.json(result);
  }

  async sendTokenForReset(req, res) {
    const { email } = req.body;
    const result = await this.service.sendTokenForReset(email);
    res.json(result);
  }

  async passwordReset(req, res) {
    const { token } = req.params;
    const result = await this.service.passwordReset(token);
    res.json(result);
  }
}

module.exports = new UserController(container.get(TYPES.UserService));
