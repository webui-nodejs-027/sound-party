/* eslint-disable no-useless-constructor */
const BaseController = require('./BaseController');
const authorService = require('../services/AuthorService');

class AuthorController extends BaseController {
  constructor(service) {
    super(service);
  }
}

module.exports = new AuthorController(authorService);
