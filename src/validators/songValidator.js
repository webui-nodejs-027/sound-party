const { checkSchema } = require('express-validator/check');
const { checkResult } = require('./checkResult');

const inputParam = {
  id: {
    in: 'params',
    isInt: {
      errorMessage: 'Invalid id'
    }
  }
};

const inputBody = {
  name: {
    in: 'body',
    exists: {
      errorMessage: "Name doesn't exist"
    },
    isEmpty: {
      errorMessage: 'Name is empty',
      options: { ignore_whitespace: true },
      negated: true
    },
    isString: {
      errorMessage: "Name isn't a string"
    }
  },
  year: {
    in: 'body',
    exists: {
      errorMessage: "Year doesn't exist"
    },
    custom: {
      options: value => {
        const regex = /^\d{4}$/;
        if (!regex.test(value) || typeof value === 'string') {
          throw new Error('Year is incorrect');
        }
        return true;
      }
    }
  },
  authorId: {
    in: 'body',
    exists: {
      errorMessage: "AuthorId doesn't exist"
    },
    custom: {
      options: value => {
        if (typeof value === 'string') {
          throw new Error('AuthorId is incorrect');
        }
        return true;
      }
    }
  },
  genreId: {
    in: 'body',
    exists: {
      errorMessage: "GenreId doesn't exist"
    },
    custom: {
      options: value => {
        if (typeof value === 'string') {
          throw new Error('GenreId is incorrect');
        }
        return true;
      }
    }
  }
};

module.exports.checkBody = [
  checkSchema(inputBody),
  checkResult
];

module.exports.checkId = [checkSchema(inputParam), checkResult];
