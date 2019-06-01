const BaseController = require('./BaseController');
const { container } = require('../ioc');
const { TYPES } = require('../constants');

class PlaylistController extends BaseController {
  async getAllDataByUserId(req, res) {
    const result = await this.service.getAllDataByUserId(req.params.userId);
    res.status(200).json(result);
  }

  async getByIdUserAndIdPlaylist(req, res) {
    const result = await this.service.getByIdUserAndIdPlaylist(
      req.params.id,
      req.params.userId
    );
    res.status(200).json(result);
  }
}

module.exports = new PlaylistController(container.get(TYPES.PlaylistService));
