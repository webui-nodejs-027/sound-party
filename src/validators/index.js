const meetingValidator = require('./meetingValidator');
const playlistValidator = require('./playlistValidator');
const baseValidator = require('./baseValidator');
const genreValidator = require('./genreValidator');
const authorValidator = require('./authorValidator');
const songValidator = require('./songValidator');

module.exports = {
  baseValidator,
  genreValidator,
  authorValidator,
  meetingValidator,
  playlistValidator,
  songValidator,
};
