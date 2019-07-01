const jwt = require('jsonwebtoken');
const { SECRET } = require('../../constants');
const { AppError } = require('../ErrorHandlers');

const checkToken = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return next(new AppError('Not authorized', 400));
  }

  if (token.indexOf('B') === 0) {
    [, token] = token.split(' ');
  }
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return next(new AppError('Token is not valid', 400));
    }
    const { id, roleId } = decoded;
    req.user = {
      id,
      roleId,
    };
    return next();
  });
  return null;
};

module.exports = checkToken;
