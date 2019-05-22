const BaseModel = require('./BaseModel');

class Genre extends BaseModel {
  constructor(name) {
    super(name);
  }
}

module.exports = Genre;
