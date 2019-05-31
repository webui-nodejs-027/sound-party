class BaseController {
  constructor(service) {
    this.service = service;
  }

  async getAllData(req, res, next) {
    const promise = this.service.getAllData(req.query);
    const result = await BaseController.checkError(promise, next);
    res.status(200)
      .json(result);
  }

  async getById(req, res, next) {
    const promise = this.service.getById(req.params.id);
    const result = await BaseController.checkError(promise, next);
    res.status(200)
      .json(result);
  }

  async insertData(req, res, next) {
    const promise = this.service.insertData(req.body);
    const result = await BaseController.checkError(promise, next);
    res.status(200)
      .json(result);
  }

  async deleteById(req, res, next) {
    const promise = this.service.deleteById(req.params.id);
    const result = await BaseController.checkError(promise, next);
    const row = result.affected;
    if (row) {
      res.status(202)
        .json({
          id: req.params.id,
          message: 'data has been deleted',
        });
    }
  }

  async updateById(req, res, next) {
    const promise = this.service.updateById(req.params.id, req.body);
    const result = await BaseController.checkError(promise, next);
    res.status(200)
      .json(result.raw[0]);
  }

  static async checkError(promise, next) {
    let result;
    try {
      result = await promise;
    } catch (e) {
      next(e);
    }
    return result;
  }
}

module.exports = BaseController;
