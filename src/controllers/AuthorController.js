/* eslint-disable no-useless-constructor */
const BaseController = require('./BaseController');
const { container } = require('../ioc');
const { TYPES } = require('../constants');

class AuthorController extends BaseController {}

module.exports = new AuthorController(container.get(TYPES.AuthorService));
