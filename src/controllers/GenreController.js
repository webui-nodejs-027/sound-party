const BaseController = require('./BaseController');
const { container } = require('../ioc');
const { TYPES } = require('../constants');

class GenreController extends BaseController {}

module.exports = new GenreController(container.get(TYPES.GenreService));
