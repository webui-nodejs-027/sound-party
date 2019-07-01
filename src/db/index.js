/* eslint-disable import/no-dynamic-require */
const { createConnection } = require('typeorm');

const env = process.env.NODE_ENV || 'test';
const config = require('../../config/dbconfig')[env];

const createDbConnection = () => createConnection(config);

module.exports = createDbConnection;
