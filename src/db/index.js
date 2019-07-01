/* eslint-disable import/no-dynamic-require */
const { createConnection } = require('typeorm');

const env = process.env.NODE_ENV || 'development';
const dbFileURL = `../../config/${env}Dbconfig`;
const config = require(dbFileURL);

const createDbConnection = () => createConnection(config);

module.exports = createDbConnection;
