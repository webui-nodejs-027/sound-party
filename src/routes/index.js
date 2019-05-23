const mainRoute = require('./mainRoute');
const userRoute = require('./userRoute');
const meetingRoute = require('./meetingRoute');

module.exports = app => {
  app.use('/', mainRoute);
  app.use('/api/users', userRoute);
  app.use('/api/meetings', meetingRoute);
};
