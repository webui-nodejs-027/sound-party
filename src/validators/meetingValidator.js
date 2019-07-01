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
  }
  next();
};

module.exports.checkId = [param('id', 'must be a number').isInt(), checkResult];
module.exports.checkUserInQuery = [
  query('userId', 'must be a number').isInt(),
  checkResult,
];
module.exports.checkStatusId = [
  body(['statusId'])
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

  body(['cityId'])
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
  query(['page', 'limit'], 'must be a positive number!').isInt({
    min: 1,
  }),
  oneOf([
    [
      query('genreId', 'must be a number!').isInt(),
      query('authorId')
        .not()
        .exists(),
    ],
    [
      query('genreId')
        .not()
        .exists(),
      query('authorId', 'must be a number!').isInt(),
    ],
    query(['genreId', 'authorId'], 'must be a number!').isInt(),
    query(['genreId', 'authorId'])
      .not()
      .exists(),
  ]),
  checkResult,
];
