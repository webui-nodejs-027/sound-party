const ClientService = require('../services/ClientService');

class ClientController {
  constructor(entity) {
    this.ClientService = new ClientService(entity);

    this.getAllData = this.getAllData.bind(this);
  }

  async getAllData(req, res) {
    const result = await this.ClientService.getAllData();
    console.log(result);
    res.status(200).json(result);
  }
}

module.exports = ClientController;
