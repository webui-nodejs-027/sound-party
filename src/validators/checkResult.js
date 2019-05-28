const { validationResult } = require('express-validator/check');
const { ValidationError } = require('../middlewares/ErrorHandlers');

module.exports.checkResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new ValidationError(errors.array()));
  }
  return next();
};
