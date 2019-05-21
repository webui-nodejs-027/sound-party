const mainRoute = require('./mainRoute');
const userRoute = require('./userRoute');

module.exports = (app) => {
  app.use('/', mainRoute);
  app.use('/api/users', userRoute);
};
