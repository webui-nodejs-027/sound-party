const {
  param,
  body,
  oneOf,
  query,
  validationResult,
} = require('express-validator/check');

const { ValidationError } = require('../middlewares/ErrorHandlers');
// eslint-disable-next-line consistent-return
const checkResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new ValidationError(errors.array()));
    // return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports.checkId = [
  param('id')
    .isInt()
    .withMessage('must be a number'),
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
      [
        body('genreId').isInt(),
        body('authorId')
          .not()
          .exists(),
      ],
      [
        body('genreId')
          .not()
          .exists(),
        body('authorId').isInt(),
      ],
    ],
    'only one property must be provided: genreId or authorId',
  ),

  body('dateTime', 'invalid time format').isISO8601(),

  checkResult,
];

module.exports.checkFindQuery = [
  oneOf([
    [
      query('genreId').isInt(),
      query('authorId')
        .not()
        .exists(),
    ],
    [
      query('genreId')
        .not()
        .exists(),
      query('authorId').isInt(),
    ],
    [query('genreId').isInt(), query('authorId').isInt()],
  ]),
  checkResult,
];
