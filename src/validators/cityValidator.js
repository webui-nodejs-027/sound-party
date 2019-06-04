const { checkSchema } = require('express-validator/check');
const { checkResult } = require('./checkResult');

const inputParam = {
  id: {
    in: 'params',
    isInt: {
      errorMessage: 'Invalid id',
    },
  },
};

const inputBody = {
  name: {
    in: 'body',
    exists: {
      errorMessage: "Name doesn't exist",
    },
    isEmpty: {
      errorMessage: 'Name is empty',
      options: { ignore_whitespace: true },
      negated: true,
    },
    isString: {
      errorMessage: 'Name isn\'t a string',
    },
    isAlpha: {
      errorMessage: 'Name isn\'t a string',
    },
  },
};

module.exports.checkBody = [
  checkSchema(inputBody),
  checkResult,
];

module.exports.checkId = [
  checkSchema(inputParam),
  checkResult,
];
