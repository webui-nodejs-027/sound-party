class BaseController {
  constructor(entity) {
    this.baseService = new BaseService(entity);
  }

  async getAllData(req, res) {
    const result = await this.baseService.getAllData();
    res.status(200).json(result);
  }

  async getById(req, res) {
    const result = await this.baseService.getById(req.params.id);
    res.status(200).json(result);
  }

  async insertData(req, res) {
    const result = await this.baseService.insertData(req.body);
    res.status(200).json(result);
  }

  async deleteById(req, res) {
    const result = await this.baseService.deleteById(req.params.id);
    res.status(200).json(result);
  }

  async updateById(req, res) {
    const result = await this.baseService.updateById(req.params.id, req.body);
    res.status(200).json(result);
  }
}

module.exports = BaseController;
