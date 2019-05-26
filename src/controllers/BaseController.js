class BaseController {
  constructor(service) {
    this.service = service;
  }

  async getAllData(req, res) {
    const result = await this.service.getAllData();
    res.status(200).json(result);
  }

  async getById(req, res) {
    const result = await this.service.getById(req.params.id);
    res.status(200).json(result);
  }

  async insertData(req, res) {
    const result = await this.service.insertData(req.body);
    res.status(200).json(result);
  }

  async deleteById(req, res) {
    const result = await this.service.deleteById(req.params.id);
    res.status(200).json(result);
  }

  async updateById(req, res) {
    const result = await this.service.updateById(req.params.id, req.body);
    res.status(200).json(result);
  }
}

module.exports = BaseController;
