/* eslint-disable no-param-reassign */
const inversify = require('inversify');
const bcrypt = require('./BcService');
const { TYPES } = require('../constants');
const BaseService = require('./BaseService');

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
}

inversify.decorate(inversify.injectable(), UserService);
inversify.decorate(inversify.inject(TYPES.UserRepository), UserService, 0);
inversify.decorate(inversify.inject(TYPES.UserMeetingService), UserService, 1);
inversify.decorate(inversify.inject(TYPES.MeetingService), UserService, 2);
module.exports = UserService;
