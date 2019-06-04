const BaseController = require('./BaseController');
const { container } = require('../ioc');
const { TYPES } = require('../constants');

class RoleController extends BaseController {}

module.exports = new RoleController(container.get(TYPES.RoleService));
