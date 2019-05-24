const passport = require('passport');
const { Strategy } = require('passport-local');

const userService = require('../src/services/UserService');
const UserEntity = require('../src/entities/UserModel');

const userServiceObj = userService;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  const findUser = await userServiceObj.getUserByEmail(user.email);
  done(null, findUser);
  return null;
});

passport.use(new Strategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  const user = await userServiceObj.getUserByEmail(email);
  if (!user) {
    return done(null, false, { errors: 'email is invalid' });
  }
  const comparePassword = await UserEntity.comparePassword(password, user.password);
  if (!comparePassword) {
    return done(null, false, { errors: 'password is invalid' });
  }
  return done(null, user);
}));
