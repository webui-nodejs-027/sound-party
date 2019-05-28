const BaseController = require('./BaseController');
const { container } = require('../ioc');
const { TYPES } = require('../constants');

class MeetingController extends BaseController {
  async createMeeting(req, res) {
    const result = await this.service.createMeeting(req);
    res.status(200).json(result);
  }

  async updateMeeting(req, res) {
    const result = await this.service.updateMeeting(req);
    res.status(200).json(result.raw[0]);
  }
}

module.exports = new MeetingController(container.get(TYPES.MeetingService));
