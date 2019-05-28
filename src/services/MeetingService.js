const inversify = require('inversify');
const { TYPES } = require('../constants');
const BaseService = require('./BaseService');

class MeetingService extends BaseService {
  //   async makeMeeting(req) {
  //     const {
  //       cityId,
  //       statusId,
  //       address,
  //       name,
  //       dateTime,
  //       genreId,
  //       authorId,
  //     } = req.body;
  //     const meeting = new MeetingModel(
  //       name,
  //       dateTime,
  //       cityId,
  //       address,
  //       statusId,
  //       genreId,
  //       authorId,
  //     );
  //     return meeting;
  //   }
  //   async createMeeting(req) {
  //     const meeting = await this.makeMeeting(req);
  //     const manager = getManager();
  //     await manager.save(MeetingEnt, meeting);
  //     const creator = req.body.creatorId;
  //     const userMeeting = new UserMeetingModel(true, creator, meeting.id);
  //     await manager.save(UserMeetingEnt, userMeeting);
  //     return meeting;
  //   }
  //   async updateMeeting(req) {
  //     const meeting = await this.makeMeeting(req);
  //     return getManager()
  //       .createQueryBuilder()
  //       .update(MeetingEnt)
  //       .set(meeting)
  //       .where('id = :id', { id: req.params.id })
  //       .output(Object.getOwnPropertyNames(this.entity.options.columns))
  //       .execute();
  //   }
}

inversify.decorate(inversify.injectable(), MeetingService);
inversify.decorate(
  inversify.inject(TYPES.MeetingRepository),
  MeetingService,
  0,
);

module.exports = MeetingService;
