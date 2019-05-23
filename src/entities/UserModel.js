class User {
  constructor(
    firstname,
    lastname,
    email,
    password,
    birthday,
    gender,
    socialLink,
    roleId,
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

module.exports = User;
