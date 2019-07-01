const BaseController = require('./BaseController');
const { container } = require('../ioc');
const { TYPES } = require('../constants');

class CityController extends BaseController {
  async insertData(req, res) {
    await this.service.checkNameCity(req.body.name);
    super.insertData(req, res);
  }

  async updateById(req, res) {
    await this.service.getById(req.params.id);
    await this.service.checkNameCity(req.body.name);
    super.updateById(req, res);
  }
}

module.exports = new CityController(container.get(TYPES.CityService));
