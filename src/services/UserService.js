const BaseService = require('./BaseService');
const { getRepository } = require('typeorm');

class UserService extends BaseService {
  constructor(entity) {
    super(entity);
  }

  async createUser(firstName, lastName, email, password, birthday, gender, socialLink, roleId){
    return getRepository(this.entity)
    .createQueryBuilder()
    .insert()
    .into(this.entity)
    .values([{
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      birthday: birthday,
      gender: gender,
      socialLink: socialLink,
      roleId: roleId
    }])
    .execute();
  }

  async updateUser(firstName, lastName, email, birthday, gender, socialLink, id){
    return getRepository(this.entity)
    .createQueryBuilder()
    .update(this.entity)
    .set({
      firstName: firstName,
      lastName: lastName,
      email: email,
      birthday: birthday,
      gender: gender,
      socialLink: socialLink,
    })
    .where("id = :id", { id: id })
    .execute();
  }
}

module.exports = UserService;


