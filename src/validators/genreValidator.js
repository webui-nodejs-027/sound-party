const {
  body,
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

module.exports.checkBody = [
  body(['name'])
    .isString()
    .not()
    .isEmpty(),

  checkResult,
];
