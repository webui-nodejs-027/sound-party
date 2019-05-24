/* eslint-disable no-useless-constructor */
const BaseController = require('./BaseController');
const meetingService = require('../services/MeetingService');

class MeetingController extends BaseController {
  constructor(service) {
    super(service);
  }

  async createMeeting(req, res) {
    const result = await this.service.createMeeting(req);
    res.status(200).json(result);
  }

  async updateMeeting(req, res) {
    const result = await this.service.updateMeeting(req);
    res.status(200).json(result.raw[0]);
  }
}

module.exports = new MeetingController(meetingService);
