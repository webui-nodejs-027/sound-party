const {
  param,
  body,
  oneOf,
  validationResult,
} = require('express-validator/check');

// eslint-disable-next-line consistent-return
const checkResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports.checkId = [
  param('id')
    .isInt()
    .not()
    .isEmpty(),
  checkResult,
];

module.exports.checkBody = [
  body(['address', 'name'])
    .isString()
    .not()
    .isEmpty(),

  body(['cityId', 'statusId', 'creatorId'])
    .isInt()
    .not()
    .isEmpty(),

  oneOf(
    [
      body('genreId')
        .isInt()
        .withMessage('must be a number')
        .not()
        .isEmpty()
        .withMessage('must be not empty'),
      body('authorId')
        .isInt()
        .withMessage('must be a number')
        .not()
        .isEmpty()
        .withMessage('must be not empty'),
    ],
    'genreId and authorId error',
  ),

  body('dateTime', 'invalid time format')
    .not()
    .isEmpty()
    .isISO8601(),

  checkResult,
];