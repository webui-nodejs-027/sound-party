const mainRoute = require('./mainRoute');
const userRoute = require('./userRoute');
const genreRoute = require('./genreRoute');

module.exports = (app) => {
  app.use('/', mainRoute);
  app.use('/api/users', userRoute);
  app.use('/api/genre', genreRoute);
};
