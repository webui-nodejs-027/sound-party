const BaseController = require('./BaseController');
const { container } = require('../ioc');
const { TYPES } = require('../constants');

class PlaylistController extends BaseController {
  async getAllDataByIdUser(req, res) {
    const result = await this.service.getAllDataByIdUser(req.params.userId);
    res.status(200).json(result);
  }

  async getByIdUserAndIdPlaylist(req, res) {
    const result = await this.service.getByIdUserAndIdPlaylist(
      req.params.id,
      req.params.userId,
    );
    res.status(200).json(result);
  }

  async createPlaylist(req, res) {
    const playlist = await this.service.createPlaylist(
      req.body.name,
      req.body.favourite,
      req.body.userId,
      req.body.isMain,
    );
    res.status(200).json(playlist);
  }

  async updatePlaylist(req, res) {
    const updatedPlaylist = await this.service.updatePlaylist(
      req.body.name,
      req.body.favourite,
      req.params.id,
    );
    res.status(200).json(updatedPlaylist);
  }
}

module.exports = new PlaylistController(container.get(TYPES.PlaylistService));
