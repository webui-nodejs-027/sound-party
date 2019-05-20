class User {
  constructor(
    firstName,
    lastName,
    email,
    password,
    birthday,
    gender,
    socialLink,
    role
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.birthday = birthday;
    this.gender = gender;
    this.socialLink = socialLink;
    this.role = role;
  }
}

module.exports = User;
