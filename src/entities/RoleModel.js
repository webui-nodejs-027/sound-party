const BaseModel = require('./BaseModel');

class Role extends BaseModel{
  constructor(name) {
    super(name);
  }
}

module.exports = Role;
