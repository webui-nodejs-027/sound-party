const BaseModel = require('./BaseModel');

class AuthorModel extends BaseModel{
  constructor(name) {
    super(name);
  }
}

module.exports = AuthorModel;
