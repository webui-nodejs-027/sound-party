const BaseController = require('./BaseController');
const { container } = require('../ioc');
const { TYPES } = require('../constants');
const { songValidator } = require('../validators/');

class SongController extends BaseController {
  async addSong(req, res) {
    req.body = {
      name: req.body.name,
      source: songValidator.getSongSrc(),
      year: req.body.year,
      authorId: req.body.authorId,
      genreId: req.body.genreId
    };
    const result = await this.service.insertData(req.body);
    res.status(200).json(result);
  }
}

module.exports = new SongController(container.get(TYPES.SongService));
