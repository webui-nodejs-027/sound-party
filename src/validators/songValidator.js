const { checkSchema } = require('express-validator/check');
const { checkResult } = require('./checkResult');

const getContentType = (req, res, next) => {
  if (req.get('Content-Type') !== 'application/json') {
    return res.status(400).json({
      message: 'Invalid content-type',
    });
  }
  return next();
};

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
  },
  year: {
    in: 'body',
    exists: {
      errorMessage: "Year doesn't exist",
    },
    isEmpty: {
      errorMessage: 'Year is empty',
      options: { ignore_whitespace: true },
      negated: true,
    },
    custom: {
      options: (value) => {
        const regex = /^\d{4}$/;
        if (!regex.test(value)) {
          throw new Error('Year is incorrect');
        }
        return true;
      },
    },
  },
  authorId: {
    in: 'body',
    exists: {
      errorMessage: "AuthorId doesn't exist",
    },
    isEmpty: {
      errorMessage: 'AuthorId is empty',
      options: { ignore_whitespace: true },
      negated: true,
    },
    custom: {
      options: (value) => {
        if (!Number(value)) {
          throw new Error('AuthorId is incorrect');
        }
        return true;
      },
    },
  },
  genreId: {
    in: 'body',
    exists: {
      errorMessage: "GenreId doesn't exist",
    },
    isEmpty: {
      errorMessage: 'GenreId is empty',
      options: { ignore_whitespace: true },
      negated: true,
    },
    custom: {
      options: (value) => {
        if (!Number(value)) {
          throw new Error('GenreId is incorrect');
        }
        return true;
      },
    },
  },
};

module.exports.checkBody = [
  getContentType,
  checkSchema(inputBody),
  checkResult,
];

module.exports.checkId = [checkSchema(inputParam), checkResult];
