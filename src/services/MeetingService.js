const { getManager } = require('typeorm');
const MeetingModel = require('../entities/MeetingModel');
const MeetingEnt = require('../db/schemas/MeetingSchema');
const City = require('../db/schemas/CitySchema');
const Status = require('../db/schemas/StatusSchema');
const Genre = require('../db/schemas/GenreSchema');
const Author = require('../db/schemas/AuthorSchema');
const BaseService = require('./BaseService');


class MeetingService {
  constructor(entity) {

  }

  async makeMeeting(req) {
    const entityManager = getManager();
    const cityName = await entityManager.findOne(City, { name: req.body.city });
    const statusName = await entityManager.findOne(Status, {
      name: req.body.status,
    });

    const city = cityName.id;
    const status = statusName.id;
    const creator = req.body.userId; // изменить
    const { address, name, dateTime } = req.body;
    let genre = null;
    let author = null;

    if (req.body.genre) {
      const genreName = await entityManager.findOne(Genre, {
        name: req.body.genre,
      });
      genre = genreName.id;
    }

    if (req.body.author) {
      const authorName = await entityManager.findOne(Author, {
        name: req.body.author,
      });
      author = authorName.id;
    }

    const meeting = new MeetingModel(
      name,
      creator,
      dateTime,
      city,
      address,
      status,
      genre,
      author,
    );
    return meeting;
  }

  async createMeeting(req) {
    const meeting = await this.makeMeeting(req);
    await getManager()
      .save(MeetingEnt, meeting);
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
