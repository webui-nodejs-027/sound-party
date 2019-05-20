const { createConnection } = require('typeorm');
const config = require('../config/dbconfig');

const createDbConnection = async () => await createConnection(config);

module.exports = {
  createDbConnection
}
