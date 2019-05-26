// eslint-disable-next-line import/no-unresolved
const bcrypt = require('bcrypt');

class User {
  constructor(
    firstname,
    lastname,
    email,
    password,
    birthday,
    gender,
    socialLink,
    // eslint-disable-next-line comma-dangle
    roleId
  ) {
    this.firstName = firstname;
    this.lastName = lastname;
    this.email = email;
    this.password = password;
    this.birthday = birthday;
    this.gender = gender;
    this.socialLink = socialLink;
    this.roleId = roleId;
  }
}

module.exports.User = User;
module.exports.hashPassword = async (password, salt = 10) => {
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

module.exports.comparePassword = async (plaintPassword, hash) => {
  const resultCompare = await bcrypt.compare(plaintPassword, hash);
  return resultCompare;
};
