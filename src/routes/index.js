const mainRoute = require('./mainRoute');
const userRoute = require('./userRoute');
// const meetingRoute = require('./meetingRoute');
const playlistRoute = require('./playlistRoute');

module.exports = (app) => {
  app.use('/', mainRoute);
  app.use('/api/users', userRoute);
  // eslint-disable-next-line spaced-comment
  //app.use('/api/meetings', meetingRoute);
  app.use('/api/playlists', playlistRoute);
};
