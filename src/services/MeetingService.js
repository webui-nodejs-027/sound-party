const inversify = require('inversify');
const { TYPES } = require('../constants');
const BaseService = require('./BaseService');

class MeetingService extends BaseService {
  constructor(repository, userMeetingService) {
    super(repository);
    this.userMeetingService = userMeetingService;
  }

  // checkIdInDb(req) {
  //   return this.repository.findOne(req.params.id);
  // }
  //
  // async checkInDb(req) {
  //   const errors = [];
  //
  //   const properties = Object.getOwnPropertyNames(req.body);
  //
  //   for (const val of properties) {
  //     if (val.includes('Id')) {
  //       let newKey = val.replace('Id', '');
  //
  //       if (newKey.includes('creator')) {
  //         newKey = newKey.replace('creator', 'user');
  //       }
  //       const manager = this.repository.manager;
  //       const result = await manager.findOne(newKey, req.body[val]);
  //       if (result === undefined) {
  //         errors.push(`cannot find ${newKey}Id with id:${req.body[val]} in DB`);
  //       }
  //     }
  //   }
  //   return errors;
  // }

  // eslint-disable-next-line class-methods-use-this
  makeMeeting(req) {
    return {
      name: req.body.name,
      dateTime: req.body.dateTime,
      cityId: req.body.cityId,
      address: req.body.address,
      statusId: req.body.statusId,
      genreId: req.body.genreId,
      authorId: req.body.authorId
    };
  }

  async createMeeting(req) {
    const propInDb = await this.checkInDb(req);
    if (propInDb.length !== 0) {
      return {
        status: 404,
        message: `${propInDb}`
      };
    }

    const meeting = this.makeMeeting(req);
    await this.repository.save(meeting);

    const userMeeting = {
      isCreator: true,
      userId: req.body.creatorId,
      meetingId: meeting.id
    };

    await this.userMeetingService.save(userMeeting);
    return {
      status: 200,
      result: meeting
    };
  }

  async updateMeeting(req) {
    const propInDb = await this.checkInDb(req);
    if (propInDb.length !== 0) {
      return {
        status: 404,
        message: `${propInDb}`
      };
    }

    const idInDb = await this.checkIdInDb(req);
    if (!idInDb) {
      return {
        status: 404,
        message: `cannot find meeting with id:${req.params.id}`
      };
    }

    const meeting = await this.makeMeeting(req);
    this.repository.update(req.params.id, meeting);
    const result = await this.repository.findOne(req.params.id);
    console.log(result);
    return {
      status: 200,
      result
    };
  }

  findMeeting(req) {
    const options = {};
    const properties = Object.entries(req.query);
    properties.forEach((val, ind) => {
      if (properties[ind][1]) {
        const value = properties[ind][1];
        options[properties[ind][0]] = value;
      }
    });
    return this.repository.find(options);
  }
}

inversify.decorate(inversify.injectable(), MeetingService);
inversify.decorate(
  inversify.inject(TYPES.MeetingRepository),
  MeetingService,
  0
);
inversify.decorate(
  inversify.inject(TYPES.UserMeetingService),
  MeetingService,
  1
);
module.exports = MeetingService;
