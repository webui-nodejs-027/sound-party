const { getRepository } = require("typeorm");

class ClientModel {
  constructor(entity) {
    this.entity = entity;
  }

  async getAllData() {
    return await getRepository(this.entity)
      .createQueryBuilder()
      .getMany();
  }
}

module.exports = ClientModel;
