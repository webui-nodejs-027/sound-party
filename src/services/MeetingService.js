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

  async getAllData(query) {
    const queryParams = Object.entries(query);
    const nameProps = ['genre', 'author', 'city', 'status'];
    const opts = {
      sortBy: 'meeting.dateTime',
    };
    const take = query.limit || 10;
    const skip = take * (query.page - 1) || 0;
    const order = query.order || 'ASC';
    let whereQuery = '';
    let andWhereQuery = '';
    queryParams.forEach((elem) => {
      if (nameProps.find(item => elem[0] === item)) {
        if (whereQuery.length === 0) {
          whereQuery = `${elem[0]}.name = '${elem[1]}'`;
        } else if (elem[0] === 'isCreator') {
          whereQuery = `${whereQuery} AND um.${elem[0]} = ${elem[1]}`;
        } else {
          whereQuery = `${whereQuery} AND ${elem[0]}.name = '${elem[1]}'`;
        }
      }
    });

    if (query.userId) {
      andWhereQuery = `um.userId = ${query.userId}`;
    }
    if (query.isCreator) {
      andWhereQuery += 'AND um.isCreator = true';
    }

    if (query.sortBy) {
      if (nameProps.find(elem => elem === query.sortBy)) {
        opts.sortBy = `${query.sortBy}.name`;
      } else {
        opts.sortBy = `meeting.${query.sortBy}`;
      }
    }

    const [data, dataCount] = await this.repository
      .createQueryBuilder('meeting')
      .select([
        'meeting.id',
        'meeting.name',
        'meeting.dateTime',
        'meeting.address',
      ])
      .leftJoinAndSelect('meeting.genre', 'genre')
      .leftJoinAndSelect('meeting.author', 'author')
      .leftJoinAndSelect('meeting.city', 'city')
      .leftJoinAndSelect('meeting.status', 'status')
      .leftJoinAndMapOne(
        'meeting.um',
        'UserMeeting',
        'um',
        'um.meetingId = meeting.id',
      )
      .where(`${whereQuery}`)
      .andWhere(`${andWhereQuery}`)
      .orderBy(`${opts.sortBy}`, `${order}`)
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return {
      page: parseInt(query.page, 10) || 1,
      limit: parseInt(query.limit, 10) || 10,
      total: dataCount,
      data,
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
