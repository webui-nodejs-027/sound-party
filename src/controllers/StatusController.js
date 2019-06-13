const BaseController = require('./BaseController');
const { container } = require('../ioc');
const { TYPES } = require('../constants');

class StatusController extends BaseController {}

module.exports = new StatusController(container.get(TYPES.StatusService));
