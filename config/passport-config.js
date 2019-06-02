const passport = require('passport');
const { Strategy } = require('passport-local');

const { container } = require('../src/ioc');
const { TYPES } = require('../src/constants');

const bcrypt = require('../src/services/BcService');
const userService = container.get(TYPES.UserService);

passport.use(new Strategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    return done(null, false, { errors: 'email is invalid' });
  }
  const comparePassword = await bcrypt.comparePassword(password, user.password);
  if (!comparePassword) {
    return done(null, false, { errors: 'password is invalid' });
  }
  return done(null, user);
}));
