const mainRoute = require('./mainRoute');
const userRoute = require('./userRoute');
// const meetingRoute = require('./meetingRoute');
const playlistRoute = require('./playlistRoute');
const songRoute = require('./songRoute');
const meetingRoute = require('./meetingRoute');

module.exports = (app) => {
  app.use('/', mainRoute);
  app.use('/api/users', userRoute);
  // eslint-disable-next-line spaced-comment
  //app.use('/api/meetings', meetingRoute);
  app.use('/api/playlists', playlistRoute);
  app.use('/api/songs', songRoute);
  app.use('/api/meeting', meetingRoute);
};
