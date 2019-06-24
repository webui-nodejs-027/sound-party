const { body } = require('express-validator/check');
const { checkResult } = require('./checkResult');

module.exports.checkEmail = [
  body('email')
    .isEmail()
    .not()
    .isEmpty(),

  checkResult
];

module.exports.checkEmailAndPassword = [
  body('email')
    .isEmail()
    .not()
    .isEmpty(),

  body(['password'])
    .isString()
    .isLength({
      min: 8,
      max: 20,
    })
    .withMessage('Password must be between 8 and 20 characters'),

  checkResult,
];

module.exports.checkBodyId = [
  body('id')
    .isInt()
    .not()
    .isEmpty(),

  checkResult
];

module.exports.checkWholeBody = [
  body(['firstName', 'lastName', 'gender'])
    .isString()
    .not()
    .isEmpty()
    .escape(),

  body(['password'])
    .isString()
    .isLength({
      min: 8,
      max: 20
    }),

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

  checkResult
];

module.exports.checkBodyMeetingId = [
  body('meetingId')
    .isInt()
    .not()
    .isEmpty(),

  checkResult
];
