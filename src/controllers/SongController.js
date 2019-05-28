const BaseController = require('./BaseController');
const { container } = require('../ioc');
const { TYPES } = require('../constants');

class SongController extends BaseController {}

module.exports = new SongController(container.get(TYPES.SongService));
