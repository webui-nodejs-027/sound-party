const inversify = require('inversify');
const { TYPES } = require('../constants');
const BaseService = require('./BaseService');

class AuthorService extends BaseService {}

inversify.decorate(inversify.injectable(), AuthorService);
inversify.decorate(inversify.inject(TYPES.AuthorRepository), AuthorService, 0);

module.exports = AuthorService;
