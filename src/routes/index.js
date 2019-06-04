const mainRoute = require('./mainRoute');
const authorRoute = require('./authorRoute');
const genreRoute = require('./genreRoute');
const meetingRoute = require('./meetingRoute');
const playlistRoute = require('./playlistRoute');
const songRoute = require('./songRoute');
const userRoute = require('./userRoute');
const roleRoute = require('./roleRoute');
const statusRoute = require('./statusRoute');

module.exports = (app) => {
  app.use('/', mainRoute);
  app.use('/api/authors', authorRoute);
  app.use('/api/genres', genreRoute);
  app.use('/api/meetings', meetingRoute);
  app.use('/api/playlists', playlistRoute);
  app.use('/api/songs', songRoute);
  app.use('/api/users', userRoute);
  app.use('/api/roles', roleRoute);
  app.use('/api/statuses', statusRoute);
};
