class BaseController {
  constructor(entity, Service) {
    this.service = new Service(entity);
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
    res.status(200).json(result.raw[0]);
  }

  async create(req, res) {
    const result = await this.service.addData(req.body);
    console.log(result);
    res.status(200).json(result);
  }
}

module.exports = BaseController;
