/* eslint-disable no-param-reassign */
const inversify = require('inversify');
const bcrypt = require('./BcService');
const { TYPES } = require('../constants');
const { AppError } = require('../middlewares/ErrorHandlers');
const BaseService = require('./BaseService');
const mailer = require('./MailerService');

class UserService extends BaseService {
  constructor(repository, userMeetingService, meetingService) {
    super(repository);
    this.userMeetingService = userMeetingService;
    this.meetingService = meetingService;
  }

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
    const decodedToken = mailer.verifyToken(token);
    await this.updateById(decodedToken.id, { roleId: 2 });
    return { message: 'Email confirmed' };
  }

  async subscribeOnMeeting(req) {
    const userMeeting = {
      isCreator: false,
      meetingId: req.body.meetingId,
      userId: req.params.id,
    };

    const inMeeting = await this.meetingService.getById(req.body.meetingId);
    if (!inMeeting) {
      return {
        status: 404,
        message: `can't find meeting with id:${req.body.meetingId} in DataBase`,
      };
    }

    const inUser = await this.userMeetingService.getById(req.params.id);
    if (!inUser) {
      return {
        status: 404,
        message: `can't find user with id:${req.params.id} in DataBase`,
      };
    }

    const subscribed = await this.userMeetingService.checkIfSubscribed(
      userMeeting,
    );
    if (subscribed) {
      return {
        status: 404,
        message: `Error! user with id: ${
          req.params.id
        } is already subscribed on meeting with id:${req.body.meetingId}`,
      };
    }

    this.userMeetingService.save(userMeeting);
    return {
      status: 200,
      result: `user with id:${
        req.params.id
      } was successfully subscribed on meeting with id:${req.body.meetingId}`,
    };
  }

  async sendTokenForReset(email) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new AppError('There are is no user with such email', 400);
    }
    return mailer.sendResetLink(user.id, user.email);
  }

  async passwordReset(token) {
    const decodedToken = mailer.verifyToken(token);
    let password = '';
    let randomCharCode;
    for (let i = 0; i < 20; i += 1) {
      randomCharCode = Math.floor(Math.random() * (127 - 33)) + 33;
      password += String.fromCharCode(randomCharCode);
    }
    const hashedPassword = await bcrypt.hashPassword(password);
    await this.updateById(decodedToken.id, { password: hashedPassword });
    await mailer.sendPassword(decodedToken.email, password);
    return { message: 'New password was sent on email' };
  }
}

inversify.decorate(inversify.injectable(), UserService);
inversify.decorate(inversify.inject(TYPES.UserRepository), UserService, 0);
inversify.decorate(inversify.inject(TYPES.UserMeetingService), UserService, 1);
inversify.decorate(inversify.inject(TYPES.MeetingService), UserService, 2);
module.exports = UserService;
