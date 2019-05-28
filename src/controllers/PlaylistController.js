const BaseController = require('./BaseController');
const PlaylistService = require('../services/PlaylistService');

class PlaylistController extends BaseController {
  // eslint-disable-next-line no-useless-constructor
  constructor(entity, service) {
    super(entity, service);
  }

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
    const playlist = await this.service.createPlaylist(req.body);
    res.status(200).json(playlist.raw[0]);
  }

  async updatePlaylist(req, res) {
    const updatedPlaylist = await this.service.updatePlaylist(
      req.body,
      req.params.id,
    );
    res.status(200).json(updatedPlaylist.raw[0]);
  }
}

module.exports = new PlaylistController(PlaylistService);
