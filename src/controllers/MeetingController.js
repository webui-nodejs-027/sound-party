const BaseController = require('./BaseController');
const { container } = require('../ioc');
const { TYPES } = require('../constants');

class MeetingController extends BaseController {
  async createMeeting(req, res, next) {
    try {
      const result = await this.service.createMeeting(req);
      if (result.name === 'AppError') {
        next(result);
      } else {
        res.status(200).json(result);
      }
    } catch (e) {
      next(e);
    }
  }

  async updateMeeting(req, res, next) {
    try {
      const result = await this.service.updateMeeting(req);
      if (result.name === 'AppError') {
        next(result);
      } else {
        res.status(200).json(result);
      }
    } catch (e) {
      next(e);
    }
  }

  async getMeetingsList(req, res, next) {
    try {
      const result = await this.service.getMeetingsList(req);
      if (result.name === 'AppError') {
        next(result);
      } else {
        res.status(200).json(result);
      }
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new MeetingController(container.get(TYPES.MeetingService));
