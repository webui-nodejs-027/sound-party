const mainRoute = require('./mainRoute');
const userRoute = require('./userRoute');
<<<<<<< HEAD
const genreRoute = require('./genreRoute');
=======
// const meetingRoute = require('./meetingRoute');
const playlistRoute = require('./playlistRoute');
>>>>>>> crudOfPlaylist
const songRoute = require('./songRoute');
const meetingRoute = require('./meetingRoute');

module.exports = (app) => {
  app.use('/', mainRoute);
  app.use('/api/users', userRoute);
  app.use('/api/genres', genreRoute);
  // eslint-disable-next-line spaced-comment
  //app.use('/api/meetings', meetingRoute);
  app.use('/api/playlists', playlistRoute);
  app.use('/api/songs', songRoute);
  app.use('/api/meetings', meetingRoute);
};
