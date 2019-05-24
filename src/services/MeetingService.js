/* eslint-disable class-methods-use-this */
const { getManager } = require('typeorm');
const MeetingModel = require('../entities/MeetingModel');
const MeetingEnt = require('../db/schemas/MeetingSchema');
const BaseService = require('./BaseService');
const UserMeetingEnt = require('../db/schemas/UserMeetingShema');
const UserMeetingModel = require('../entities/UserMeeting');

class MeetingService extends BaseService {
  // eslint-disable-next-line no-useless-constructor
  constructor(entity) {
    super(entity);
  }

  async makeMeeting(req) {
    const {
      cityId, statusId, address, name, dateTime, genreId, authorId,
    } = req.body;

    const meeting = new MeetingModel(
      name,
      dateTime,
      cityId,
      address,
      statusId,
      genreId,
      authorId,
    );
    return meeting;
  }

  async createMeeting(req) {
    const meeting = await this.makeMeeting(req);
    const manager = getManager();
    await manager.save(MeetingEnt, meeting);

    const creator = req.body.creatorId;
    const userMeeting = new UserMeetingModel(true, creator, meeting.id);
    await manager.save(UserMeetingEnt, userMeeting);

    return meeting;
  }

  async updateMeeting(req) {
    const meeting = await this.makeMeeting(req);

    return getManager()
      .createQueryBuilder()
      .update(MeetingEnt)
      .set(meeting)
      .where('id = :id', { id: req.params.id })
      .output(Object.getOwnPropertyNames(this.entity.options.columns))
      .execute();
  }
}

module.exports = new MeetingService(MeetingEnt);
