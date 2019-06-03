const inversify = require('inversify');
const { TYPES } = require('../constants');
const BaseService = require('./BaseService');

class RoleService extends BaseService {}

inversify.decorate(inversify.injectable(), RoleService);
inversify.decorate(inversify.inject(TYPES.RoleRepository), RoleService, 0);

module.exports = RoleService;
