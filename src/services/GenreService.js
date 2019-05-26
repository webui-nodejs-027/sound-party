const BaseService = require('./BaseService');
// const GenreModel = require('../entities/GenreModel');
const GenreEntity = require('../db/schemas/GenreSchema');

class GenreService extends BaseService {
  // eslint-disable-next-line no-useless-constructor
  constructor(entity) {
    super(entity);
  }
}

module.exports = new GenreService(GenreEntity);
