const BaseController = require('./BaseController');
const { container } = require('../ioc');
const { TYPES } = require('../constants');
const { getSongSrc } = require('../middlewares/appMiddlewares/songMiddleware');

class SongController extends BaseController {
  async getAllData(req, res) {
    const result = await this.service.getAllData(req.query);
    res.status(200).json(result);
  }

  async addSongData(req, res) {
    await this.service.checkNameSong(req.body.name, req.body.authorId);
    await super.insertData(req, res);
  }

  async addSongSrc(req, res) {
    const source = getSongSrc();
    await this.service.checkIdSongSrc(req.body.id, source);
    const result = await this.service.updateById(req.body.id, { source });
    res.status(201).json(result.raw[0]);
  }

  async deleteSong(req, res) {
    await this.service.checkIdSong(req.params.id);
    const data = await this.service.getById(req.params.id);
    await this.service.deleteSong(data);
    await super.deleteById(req, res);
  }

  async updateSongData(req, res) {
    await this.service.checkIdSong(req.params.id);
    await this.service.checkNameSong(req.body.name, req.body.authorId);
    await super.updateById(req, res);
  }

  async updateSongFile(req, res) {
    const source = getSongSrc();
    await this.service.checkIdSongSrc(req.params.id, source);
    const data = await this.service.getById(req.params.id);
    await this.service.deleteSong(data);
    const result = await this.service.updateById(req.params.id, { source });
    res.status(200).json(result.raw[0]);
  }
}

module.exports = new SongController(container.get(TYPES.SongService));
