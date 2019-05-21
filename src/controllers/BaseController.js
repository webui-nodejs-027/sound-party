const BaseService = require('../services/BaseService');

class BaseController {
  constructor(entity) {
    this.BaseService = new BaseService(entity);
  }

  async getAllData(req, res) {
    const result = await this.BaseService.getAllData();
    console.log(result);
    res.status(200).json(result);
  }
}

module.exports = BaseController;
