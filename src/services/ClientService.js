const ClientModel = require("../models/ClientModel");

class ClientService {
  constructor(entity) {
    this.ClientModel = new ClientModel(entity);
  }

  async getAllData() {
    return await this.ClientModel.getAllData();
  }
}

module.exports = ClientService;
