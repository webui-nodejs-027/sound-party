const { body } = require('express-validator/check');
const { checkResult } = require('./checkResult');

module.exports.checkBody = [
  body('name').isString(),
  checkResult,
];
