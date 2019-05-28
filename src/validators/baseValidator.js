const { param } = require('express-validator/check');
const { checkResult } = require('./checkResult');

module.exports.checkId = [
  param('id')
    .isInt()
    .not()
    .isEmpty(),
  checkResult,
];
