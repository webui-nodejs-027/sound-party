/* eslint-disable no-useless-constructor */
const BaseController = require('./BaseController');
const MeetingService = require('../services/MeetingService');
const Meeting = require('../db/schemas/MeetingSchema');

class MeetingController extends BaseController {
  constructor(entity, service) {
    super(entity, service);
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

module.exports = new MeetingController(Meeting, MeetingService);
