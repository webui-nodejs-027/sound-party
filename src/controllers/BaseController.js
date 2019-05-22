const BaseService = require('../services/BaseService');

class BaseController {
  constructor(entity) {
    this.BaseService = new BaseService(entity);
  }

  async getAllData(req, res) {
    const result = await this.BaseService.getAllData();
    res.status(200).json(result);
  }

  async getDataById(req, res) {
    const result = await this.BaseService.getDataById(req.params.id);
    res.status(200).json(result);
  }

  async addData(req, res) {
    const result = await this.BaseService.addData(req.body);
    res.status(200).json(result);
  }
}

module.exports = BaseController;
