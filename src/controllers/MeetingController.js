const BaseController = require('./BaseController');
const { container } = require('../ioc');
const { TYPES } = require('../constants');

class MeetingController extends BaseController {
  async createMeeting(req, res) {
    const { result, status, message } = await this.service.createMeeting(req);
    res.status(status).json({
      message: result || message,
    });
  }

  async updateMeeting(req, res) {
    const { result, status, message } = await this.service.updateMeeting(req);
    res.status(status).json({
      message: result || message,
    });
  }

  async findMeeting(req, res) {
    const result = await this.service.findMeeting(req);
    res.status(200).json(result);
  }
}

module.exports = new MeetingController(container.get(TYPES.MeetingService));
