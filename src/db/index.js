const { createConnection } = require('typeorm');
const config = require('../../config/dbconfig');

const createDbConnection = () => createConnection(config);

module.exports = createDbConnection;
