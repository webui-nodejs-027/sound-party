const BaseModel = require('./BaseModel');

class Role extends BaseModel {
  // eslint-disable-next-line no-useless-constructor
  constructor(name) {
    super(name);
  }
}

module.exports = Role;
