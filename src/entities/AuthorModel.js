const BaseModel = require('./BaseModel');

class AuthorModel extends BaseModel {
// eslint-disable-next-line no-useless-constructor
  constructor(name) {
    super(name);
  }
}

module.exports = AuthorModel;
