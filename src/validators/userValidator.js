const { body } = require('express-validator/check');
const { checkResult } = require('./checkResult');

module.exports = [
  body('email').isEmail(),
  body(['password'])
    .isString()
    .isLength({
      min: 8,
      max: 20,
    }),
  body(['firstName']).isString(),
  body(['lastName']).isString(),
  body(['gender']).isString(),
  body(['socialLink']).isString(),
  body(['roleId']).isInt(),
  checkResult,
];
