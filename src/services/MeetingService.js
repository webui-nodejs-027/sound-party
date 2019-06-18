/* eslint-disable no-await-in-loop,no-restricted-syntax,no-underscore-dangle */
const inversify = require('inversify');
const { TYPES } = require('../constants');
const BaseService = require('./BaseService');
const { AppError } = require('../middlewares/ErrorHandlers');

class MeetingService extends BaseService {
  constructor(repository, userMeetingService) {
    super(repository);
    this.userMeetingService = userMeetingService;
  }

  async _checkIdInDb(id) {
    const result = await this.repository.findOne(id);
    if (!result) {
      throw new AppError(`cannot find meeting with id:${id}`, 404);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  makeMeeting(req) {
    return {
      name: req.body.name,
      dateTime: req.body.dateTime,
      cityId: req.body.cityId,
      address: req.body.address,
      statusId: req.body.statusId,
      genreId: req.body.genreId,
      authorId: req.body.authorId,
    };
  }

  async createMeeting(req) {
    const meeting = this.makeMeeting(req);
    await this.repository.save(meeting);
    const userMeeting = {
      isCreator: true,
      userId: req.body.creatorId,
      meetingId: meeting.id,
    };

    await this.userMeetingService.save(userMeeting);
    return meeting;
  }

  async updateMeeting(req) {
    await this._checkIdInDb(req.params.id);
    const meeting = await this.makeMeeting(req);
    await this.repository.update(req.params.id, meeting);
    return this.repository.findOne(req.params.id);
  }
}

inversify.decorate(inversify.injectable(), MeetingService);
inversify.decorate(
  inversify.inject(TYPES.MeetingRepository),
  MeetingService,
  0,
);
inversify.decorate(
  inversify.inject(TYPES.UserMeetingService),
  MeetingService,
  1,
);
module.exports = MeetingService;
