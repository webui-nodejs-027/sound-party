const BaseService = require('./BaseService');
const AuthorEntity = require('../db/schemas/AuthorSchema');

class AuthorService extends BaseService {
  // eslint-disable-next-line no-useless-constructor
  constructor(entity) {
    super(entity);
  }
}

module.exports = new AuthorService(AuthorEntity);
