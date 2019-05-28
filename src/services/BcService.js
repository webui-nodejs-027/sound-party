const bcrypt = require('bcrypt');

module.exports.hashPassword = async (password, salt = 10) => {
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

module.exports.comparePassword = async (plaintPassword, hash) => {
  const resultCompare = await bcrypt.compare(plaintPassword, hash);
  return resultCompare;
};
