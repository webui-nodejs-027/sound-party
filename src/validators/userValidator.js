const { body } = require('express-validator/check');

const { checkResult } = require('./checkResult');

module.exports.checkEmail = [
  body('email')
    .isEmail()
    .not()
    .isEmpty(),

  checkResult,
];

module.exports.checkBodyId = [
  body('id')
    .isInt()
    .not()
    .isEmpty(),

  checkResult,
];

module.exports.checkWholeBody = [
  body(['firstName', 'lastName', 'password', 'gender'])
    .isString()
    .not()
    .isEmpty()
    .escape(),

  body('email')
    .isEmail()
    .not()
    .isEmpty(),

  body('socialLink')
    .isURL()
    .not()
    .isEmpty(),

  body('birthday')
    .isISO8601()
    .not()
    .isEmpty(),

  checkResult,
];
