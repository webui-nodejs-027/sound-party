const inversify = require('inversify');
const { TYPES } = require('../constants');
const BaseService = require('./BaseService');

class GenreService extends BaseService {}

inversify.decorate(inversify.injectable(), GenreService);
inversify.decorate(inversify.inject(TYPES.GenreRepository), GenreService, 0);

module.exports = GenreService;
