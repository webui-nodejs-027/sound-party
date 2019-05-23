const BaseModel = require('./BaseModel');

class City extends BaseModel {
  // eslint-disable-next-line no-useless-constructor
  constructor(name) {
    super(name);
  }
}

module.exports = City;
