const meetingValidator = require('./meetingValidator');
const playlistValidator = require('./playlistValidator');
const baseValidator = require('./baseValidator');
const genreValidator = require('./genreValidator');
const authorValidator = require('./authorValidator');
const songValidator = require('./songValidator');
const userValidator = require('./userValidator');

module.exports = {
  baseValidator,
  genreValidator,
  authorValidator,
  meetingValidator,
  playlistValidator,
  songValidator,
  userValidator,
};
