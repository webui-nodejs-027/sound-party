const BaseController = require('./BaseController');
const SongService = require('../services/SongService');
const Song = require('../db/schemas/SongSchema');

class SongController extends BaseController {
  // eslint-disable-next-line no-useless-constructor
  constructor(entity, service) {
    super(entity, service);
  }

  async insertSong(req, res) {
    const result = await this.service.insertSong(req.body);
    res.status(200).json(result.raw[0]);
  }

  async changeSong(req, res) {
    const result = await this.service.changeSong(req.body, req.params.id);
    res.status(200).json(result.raw[0]);
  }
}

module.exports = new SongController(Song, SongService);
