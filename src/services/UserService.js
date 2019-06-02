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
    try {
      const decodedToken = mailer.verifyToken(token);
      await this.updateById(decodedToken.id, { roleId: 1 });
    } catch (e) {
      throw new AppError(e.message, 400);
    }
    return { message: 'Email confirmed' };
  }

  async subscribeOnMeeting(req) {
    const userMeeting = {
      isCreator: false,
      meetingId: req.body.meetingId,
      userId: req.params.id,
    };

    try {
      const inMeeting = await this.meetingService.getById(req.body.meetingId);
      if (!inMeeting) {
        throw new AppError(
          `cannot find meeting with id:${req.body.meetingId}`,
          404,
        );
      }

      const inUser = await this.userMeetingService.getById(req.params.id);
      if (!inUser) {
        throw new AppError(`can't find user with id:${req.params.id}`, 404);
      }

      const subscribed = await this.userMeetingService.checkIfSubscribed(
        userMeeting,
      );
      if (subscribed) {
        throw new AppError(
          `Error! user with id: ${
            req.params.id
          } is already subscribed on meeting with id:${req.body.meetingId}`,
          400,
        );
      }
    } catch (e) {
      return e;
    }

    this.userMeetingService.save(userMeeting);
    return `user with id:${
      req.params.id
    } was successfully subscribed on meeting with id:${req.body.meetingId}`;
  }

  async unsubscribeFromMeeting(req) {
    const userMeeting = {
      isCreator: false,
      meetingId: req.body.meetingId,
      userId: req.params.id,
    };

    try {
      const inMeeting = await this.meetingService.getById(req.body.meetingId);
      if (!inMeeting) {
        throw new AppError(
          `cannot find meeting with id:${req.body.meetingId}`,
          404,
        );
      }

      const inUser = await this.userMeetingService.getById(req.params.id);
      if (!inUser) {
        throw new AppError(`can't find user with id:${req.params.id}`, 404);
      }

      const subscribed = await this.userMeetingService.checkIfSubscribed(
        userMeeting,
      );
      if (!subscribed) {
        throw new AppError(
          `Error! user with id: ${
            req.params.id
          } is not subscribed on meeting with id:${req.body.meetingId}`,
          400,
        );
      }
    } catch (e) {
      return e;
    }

    this.userMeetingService.deleteById(userMeeting);
    return `user with id:${
      req.params.id
    } was successfully deleted from meeting with id:${req.body.meetingId}`;
  }

  // async unsubscribeFromMeeting(req) {
  //   const userMeeting = {
  //     isCreator: false,
  //     meetingId: req.body.meetingId,
  //     userId: req.params.id,
  //   };
  //
  //   const inMeeting = await this.meetingService.getById(req.body.meetingId);
  //   if (!inMeeting) {
  //     return {
  //       status: 404,
  //       message: `can't find meeting with id:${req.body.meetingId} in DataBase`,
  //     };
  //   }
  //
  //   const inUser = await this.userMeetingService.getById(req.params.id);
  //   if (!inUser) {
  //     return {
  //       status: 404,
  //       message: `can't find user with id:${req.params.id} in DataBase`,
  //     };
  //   }
  //
  //   const subscribed = await this.userMeetingService.checkIfSubscribed(
  //     userMeeting,
  //   );
  //   if (!subscribed) {
  //     return {
  //       status: 400,
  //       message: `Error! user with id: ${
  //         req.params.id
  //       } is not subscribed on meeting with id:${req.body.meetingId}`,
  //     };
  //   }
  //   this.userMeetingService.deleteById(userMeeting);
  //   return {
  //     status: 200,
  //     result: `user with id:${
  //       req.params.id
  //     } was successfully deleted from meeting with id:${req.body.meetingId}`,
  //   };
  // }
}

inversify.decorate(inversify.injectable(), UserService);
inversify.decorate(inversify.inject(TYPES.UserRepository), UserService, 0);
inversify.decorate(inversify.inject(TYPES.UserMeetingService), UserService, 1);
inversify.decorate(inversify.inject(TYPES.MeetingService), UserService, 2);
module.exports = UserService;
