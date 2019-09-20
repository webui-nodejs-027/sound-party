const inversify = require('inversify');
const { TYPES } = require('../constants');
const BaseService = require('./BaseService');
const { AppError } = require('../middlewares/ErrorHandlers');

class CityService extends BaseService {
  async checkNameCity(name) {
    const result = await this.repository.findOne({ where: { name } });
    if (result) {
      throw new AppError('Name exists', 400);
    }
  }
}

inversify.decorate(inversify.injectable(), CityService);
inversify.decorate(inversify.inject(TYPES.CityRepository), CityService, 0);

module.exports = CityService;
