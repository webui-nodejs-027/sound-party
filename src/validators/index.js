const meetingValidator = require('./meetingValidator');
const playlistValidator = require('./playlistValidator');
const baseValidator = require('./baseValidator');
const genreValidator = require('./genreValidator');
const authorValidator = require('./authorValidator');
const cityValidator = require('./cityValidator');
const songValidator = require('./songValidator');

module.exports = {
  baseValidator,
  genreValidator,
  authorValidator,
  cityValidator,
  meetingValidator,
  playlistValidator,
  songValidator,
};
