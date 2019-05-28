const inversify = require('inversify');
const { TYPES } = require('../constants');
const BaseService = require('./BaseService');

class SongService extends BaseService {}

inversify.decorate(inversify.injectable(), SongService);
inversify.decorate(inversify.inject(TYPES.SongRepository), SongService, 0);

module.exports = SongService;
