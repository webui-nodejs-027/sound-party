const BaseService = require('../services/BaseService');

class BaseController {
  constructor(entity, service) {
    this.service = new service(entity);
}

  async getAllData(req, res) {
    const result = await this.service.getAllData();
    console.log(result);
    res.status(200).json(result);
  }

  async getById(req, res) {
    const result = await this.service.getById(req.params.id);
    res.status(200).json(result);
  }

  async deleteById(req, res) {
    const result = await this.service.deleteById(req.params.id);
    res.status(200).json(result);
  }
}

module.exports = BaseController;
