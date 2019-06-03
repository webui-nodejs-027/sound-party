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

  async _checkPropsInDb(req) {
    const { manager } = this.repository;
    const properties = Object.getOwnPropertyNames(req.body);

    for (const val of properties) {
      if (val.includes('Id')) {
        let newKey = val.replace('Id', '');
        if (newKey.includes('creator')) {
          newKey = newKey.replace('creator', 'user');
        }
        const result = await manager.findOne(newKey, req.body[val]);
        if (result === undefined) {
          throw new AppError(
            `cannot find ${newKey}Id with value:${req.body[val]} in DB`
          );
        }
      }
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
      authorId: req.body.authorId
    };
  }

  async createMeeting(req) {
    await this._checkPropsInDb(req);
    const meeting = this.makeMeeting(req);
    await this.repository.save(meeting);
    const userMeeting = {
      isCreator: true,
      userId: req.body.creatorId,
      meetingId: meeting.id
    };

    await this.userMeetingService.save(userMeeting);
    return meeting;
  }

  async updateMeeting(req) {
    await this._checkIdInDb(req.params.id);
    await this._checkPropsInDb(req);

    const meeting = await this.makeMeeting(req);
    await this.repository.update(req.params.id, meeting);
    return this.repository.findOne(req.params.id);
  }

  async getMeetingsList(req) {
    const queryParams = Object.entries(req.query);
    const findOptions = {
      where: {}
    };
    queryParams.forEach(elem => {
      if (elem[0] !== 'page' && elem[0] !== 'limit') {
        [, findOptions.where[elem[0]]] = elem;
      }
    });

    findOptions.take = req.query.limit;
    findOptions.skip = findOptions.take * (req.query.page - 1);
    const [data, dataCount] = await this.repository.findAndCount(findOptions);
    const pages = dataCount / req.query.limit;
    return {
      page: req.query.page,
      perPage: req.query.limit,
      total: dataCount,
      totalPages: pages,
      data
    };
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
