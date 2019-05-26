const mainRoute = require('./mainRoute');
const userRoute = require('./userRoute');
const genreRoute = require('./genreRoute');
// const meetingRoute = require('./meetingRoute');
const playlistRoute = require('./playlistRoute');
const songRoute = require('./songRoute');
const meetingRoute = require('./meetingRoute');
const authorRoute = require('./authorRoute');

module.exports = (app) => {
  app.use('/', mainRoute);
  app.use('/api/users', userRoute);
  app.use('/api/genres', genreRoute);
  // eslint-disable-next-line spaced-comment
  //app.use('/api/meetings', meetingRoute);
  app.use('/api/playlists', playlistRoute);
  app.use('/api/songs', songRoute);
  app.use('/api/meetings', meetingRoute);
  app.use('/api/authors', authorRoute);
};
