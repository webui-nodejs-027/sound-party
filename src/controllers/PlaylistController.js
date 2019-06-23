const BaseController = require('./BaseController');
const { container } = require('../ioc');
const { TYPES } = require('../constants');

class PlaylistController extends BaseController {
  async getAllDataByUserId(req, res, next) {
    try {
      const { user } = req;
      const result = await this.service.getAllDataByUserId(user.id);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async getByIdUserAndIdPlaylist(req, res, next) {
    try {
      const result = await this.service.getByIdUserAndIdPlaylist(
        req.params.id,
        req.params.userId,
      );
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async getAllSongsFromPlaylist(req, res, next) {
    try {
      const result = await this.service.getAllSongsFromPlaylist(req.params.id);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async addSongToPlaylist(req, res, next) {
    try {
      const result = await this.service.addSongToPlaylist(
        req.params.id,
        req.params.songId,
      );
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async removeSongFromPlaylist(req, res, next) {
    try {
      const result = await this.service.removeSongFromPlaylist(
        req.params.id,
        req.params.songId,
      );
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new PlaylistController(container.get(TYPES.PlaylistService));
