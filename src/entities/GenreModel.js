const BaseModel = require('./BaseModel');

class Genre extends BaseModel {
  // eslint-disable-next-line no-useless-constructor
  constructor(name) {
    super(name);
  }
}

module.exports = Genre;
