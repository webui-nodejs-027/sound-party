const { body, param } = require('express-validator/check');

const { checkResult } = require('./checkResult');


module.exports.checkUserId = [
  param('userId')
    .isInt()
    .not()
    .isEmpty(),
  checkResult,
];

module.exports.checkBody = [
  body('name')
    .isString()
    .not()
    .isEmpty(),

  body('userId')
    .isInt()
    .not()
    .isEmpty(),

  body(['favourite', 'isMain'])
    .isBoolean()
    .not()
    .isEmpty(),

  checkResult,
];

module.exports.checkBodyForPut = [
  body('name')
    .isString()
    .not()
    .isEmpty(),

  body('favourite')
    .isBoolean()
    .not()
    .isEmpty(),

  checkResult,
]; //
