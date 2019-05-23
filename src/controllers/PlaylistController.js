const BaseController = require('./BaseController');
const PlaylistService = require('../services/PlaylistService');
const Playlist = require('../db/schemas/PlaylistSchema');

class PlaylistController extends BaseController {
  // eslint-disable-next-line no-useless-constructor
  constructor(entity, service) {
    super(entity, service);
  }

  async getAllDataByIdUser(req, res) {
    const result = await this.service.getAllDataByIdUser(req.params.userId);
    console.log(result);
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
    console.log(playlist);
    res.status(200).json(playlist);
  }

  async updatePlaylist(req, res) {
    const updatedPlaylist = await this.service.updatePlaylist(
      req.body.name,
      req.body.favourite,
      req.params.id,
    );
    console.log(updatedPlaylist);
    res.status(200).json(updatedPlaylist);
  }
}

module.exports = new PlaylistController(Playlist, PlaylistService);
