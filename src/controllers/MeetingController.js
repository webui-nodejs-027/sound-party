const BaseController = require('./BaseController');
const { container } = require('../ioc');
const { TYPES } = require('../constants');

class MeetingController extends BaseController {
  async createMeeting(req, res) {
    const result = await this.service.createMeeting(req);
    res.status(201).json(result);
  }

  async updateMeeting(req, res) {
    const result = await this.service.updateMeeting(req);
    res.status(200).json(result);
  }

  async getMeetingsList(req, res) {
    const result = await this.service.getMeetingsList(req);
    res.status(200).json(result);
  }
}

module.exports = new MeetingController(container.get(TYPES.MeetingService));
