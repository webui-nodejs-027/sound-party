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
      req.logIn(user, { session: false }, err => {
        if (err) {
          return next(err);
        }
        const payLoad = {
          id: user.id,
          roleId: user.roleId
        };
        const token = jwt.sign(payLoad, SECRET, {
          expiresIn: '24h'
        });
        return res.json({
          succes: true,
          message: 'Authentication succesful',
          token
        });
      });
    })(req, res, next);
  }

  async addUser(req, res) {
    const result = await this.service.insertUserData(req.body);
    const { password, ...user } = result;
    res.send(user);
  }

  async getUser(req, res) {
    const result = await this.service.getById(req.params.id);
    const { password, ...user } = result;
    res.send(user);
  }

  async getUsers(req, res) {
    const result = await this.service.getAllData();
    const users = result.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    res.send(users);
  }

  async subscribeOnMeeting(req, res, next) {
    try {
      const result = await this.service.subscribeOnMeeting(req);
      if (result.name === 'AppError') {
        next(result);
      } else {
        res.status(200).json(result);
      }
    } catch (e) {
      next(e);
    }
  }

  async unsubscribeFromMeeting(req, res, next) {
    try {
      const result = await this.service.unsubscribeFromMeeting(req);
      if (result.name === 'AppError') {
        next(result);
      } else {
        res.status(200).json(result);
      }
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController(container.get(TYPES.UserService));
