const BaseModel = require('./BaseModel');

class Status extends BaseModel {
  // eslint-disable-next-line no-useless-constructor
  constructor(name) {
    super(name);
  }
}

module.exports = Status;
