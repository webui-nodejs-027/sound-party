const { body, param, validationResult } = require('express-validator/check');

const checkResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
};

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
];
