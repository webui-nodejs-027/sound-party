const mainRoute = require('./mainRoute');
const userRoute = require('./userRoute');
const songRoute = require('./songRoute');

module.exports = (app) => {
  app.use('/', mainRoute);
  app.use('/api/users', userRoute);
  app.use('/api/songs', songRoute);
};
