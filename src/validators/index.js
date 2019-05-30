const meetingValidator = require('./meetingValidator');
const playlistValidator = require('./playlistValidator');
const baseValidator = require('./baseValidator');
const genreValidator = require('./genreValidator');
const authorValidator = require('./authorValidator');

module.exports = {
  baseValidator,
  genreValidator,
  authorValidator,
  meetingValidator,
  playlistValidator
};
