const BaseController = require('./BaseController');
const GenreService = require('../services/GenreService');

class GenreController extends BaseController {
  constructor(entity) {
    super(entity);
  }
}

module.exports = GenreController;
