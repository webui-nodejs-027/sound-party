const BaseController = require('./BaseController');
const GenreService = require('../services/GenreService');


class GenreController extends BaseController {
  // eslint-disable-next-line no-useless-constructor
  constructor(entity) {
    super(entity);

    this.genreService = new GenreService(entity);
  }
}

module.exports = GenreController;
