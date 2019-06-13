const inversify = require('inversify');
const { TYPES } = require('../constants');
const BaseService = require('./BaseService');

class StatusService extends BaseService {}

inversify.decorate(inversify.injectable(), StatusService);
inversify.decorate(inversify.inject(TYPES.StatusRepository), StatusService, 0);

module.exports = StatusService;
