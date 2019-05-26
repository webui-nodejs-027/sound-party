/* eslint-disable no-useless-constructor */
const BaseController = require('./BaseController');
const genreService = require('../services/GenreService');

class GenreController extends BaseController {
  constructor(service) {
    super(service);
  }
}

module.exports = new GenreController(genreService);
