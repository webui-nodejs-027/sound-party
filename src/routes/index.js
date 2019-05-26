const mainRoute = require('./mainRoute');
const userRoute = require('./userRoute');
const genreRoute = require('./genreRoute');
const songRoute = require('./songRoute');
const meetingRoute = require('./meetingRoute');
const authorRoute = require('./authorRoute');

module.exports = (app) => {
  app.use('/', mainRoute);
  app.use('/api/users', userRoute);
  app.use('/api/genres', genreRoute);
  app.use('/api/songs', songRoute);
  app.use('/api/meetings', meetingRoute);
  app.use('/api/authors', authorRoute);
};
