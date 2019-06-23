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

  // req.query.userId
  async getByIdAndUser(req) {
    const data = await this.repository
      .createQueryBuilder('meeting')
      .innerJoinAndMapOne(
        'meeting.um',
        'UserMeeting',
        'um',
        'um.meetingId = meeting.id'
      )
      .select('meeting')
      .where(`um."meetingId" = ${req.params.id}`)
      .innerJoin('um.user', 'creator')
      .addSelect('creator."firstName"', 'creator_firstName')
      .addSelect('creator."lastName"', 'creator_lastName')
      .addSelect(
        subQuery =>
          subQuery
            .select('COUNT(um.meetingId)', 'count')
            .from('UserMeeting', 'um')
            .where(`um."meetingId" = ${req.params.id}`)
            .groupBy('meeting.id'),
        'count'
      )
      .addSelect(
        subQuery =>
          subQuery
            .select('COUNT(um.userId)', 'count')
            .from('UserMeeting', 'um')
            .where(
              `um."meetingId" = ${req.params.id} AND um."userId" = ${
                req.query.userId
              }`
            )
            .groupBy('meeting.id'),
        'user_in_meeting'
      )
      .addSelect(
        subQuery =>
          subQuery
            .select('um."userId"', 'userId')
            .from('UserMeeting', 'um')
            .where(
              `um."meetingId" = ${req.params.id} AND um."isCreator" = true`
            )
            .limit(1),
        'creator_id'
      )
      .getRawOne();

    if (!data) {
      throw new AppError(`Data with  id = ${req.params.id}  not found`);
    }
    return data;
  }

  // eslint-disable-next-line class-methods-use-this
  makeMeeting(req) {
    return {
      name: req.body.name,
      dateTime: req.body.dateTime,
      cityId: req.body.cityId,
      address: req.body.address,
      genreId: req.body.genreId,
      authorId: req.body.authorId
    };
  }

  async getAllData(query) {
    const queryParams = Object.entries(query);
    const nameProps = ['genre', 'author', 'city', 'status'];
    const opts = {
      sortBy: 'meeting.dateTime'
    };
    const take = query.limit || 10;
    const skip = take * (query.page - 1) || 0;
    const order = query.order || 'ASC';
    let whereQuery = '';
    queryParams.forEach(elem => {
      if (nameProps.find(item => elem[0] === item)) {
        if (whereQuery.length === 0) {
          whereQuery = `${elem[0]}.name = '${elem[1]}'`;
        } else if (elem[0] === 'isCreator') {
          whereQuery = `${whereQuery} AND um.${elem[0]} = ${elem[1]}`;
        } else {
          whereQuery = `${whereQuery} AND ${elem[0]}.name = ${elem[1]}`;
        }
      }
    });
    if (query.userId) {
      if (whereQuery.length !== 0) {
        whereQuery += `AND um.userId = ${query.userId}`;
      } else {
        whereQuery += `um.userId = ${query.userId}`;
      }
    }

    // if (query.userId) {
    //   andWhereQuery = `um.userId = ${query.userId}`;
    // }
    // if (query.isCreator) {
    //   whereQuery += 'AND um.isCreator = true';
    // }

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
        'meeting.address'
      ])
      .leftJoinAndSelect('meeting.genre', 'genre')
      .leftJoinAndSelect('meeting.author', 'author')
      .leftJoinAndSelect('meeting.city', 'city')
      .leftJoinAndSelect('meeting.status', 'status')
      .innerJoinAndMapOne(
        'meeting.um',
        'UserMeeting',
        'um',
        'um.meetingId = meeting.id'
      )
      .where(whereQuery)
      // .andWhere(andWhereQuery)
      .orderBy(`${opts.sortBy}`, `${order}`)
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return {
      page: parseInt(query.page, 10) || 1,
      limit: parseInt(query.limit, 10) || 10,
      total: dataCount,
      data
    };
  }

  async createMeeting(req) {
    const meeting = this.makeMeeting(req);
    meeting.statusId = 1;
    await this.repository.save(meeting);
    const userMeetingCreator = {
      isCreator: true,
      userId: req.body.creatorId,
      meetingId: meeting.id
    };

    await this.userMeetingService.save(userMeetingCreator);
    return meeting;
  }

  async updateMeeting(req) {
    await this._checkIdInDb(req.params.id);
    const meeting = await this.makeMeeting(req);
    meeting.statusId = req.body.statusId;
    await this.repository.update(req.params.id, meeting);
    return this.repository.findOne(req.params.id);
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
