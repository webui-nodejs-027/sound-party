const passport = require('passport');
const { Strategy } = require('passport-local');

const userSchema = require('../src/db/schemas/UserSchema');
const { getRepository } = require('typeorm');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const findUser = getRepository(this.entity)
    .createQueryBuilder(`${this.entity.name}`)
    .where(`${this.entity.name}.id = :id`, { id })
    .getOne();
  done(null, findUser);
  return null;
});


passport.use(new Strategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]',
}, async (email, password, done) => {
  const user = getRepository(userSchema)
    .createQueryBuilder(`${userSchema.name}`)
    .where(`${userSchema.name}.email = :email`, { email })
    .getOne();
  if (!user) {
    return done(null, false, { errors: { 'email or passward': 'is invalid' } });
  }
  return done(null, user);
}));
