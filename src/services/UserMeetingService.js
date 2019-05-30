const inversify = require('inversify');
const { TYPES } = require('../constants');
const BaseService = require('./BaseService');

class UserMeetingService extends BaseService {
  async save(obj) {
    await this.repository.save(obj);
  }

  checkIfSubscribed(obj) {
    return this.repository.findOne(obj);
  }
}

inversify.decorate(inversify.injectable(), UserMeetingService);
inversify.decorate(
  inversify.inject(TYPES.UserMeetingRepository),
  UserMeetingService,
  0,
);
module.exports = UserMeetingService;
