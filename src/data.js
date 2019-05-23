const MeetingService = require('./services/MeetingService');
const SongService = require('./services/SongService');
const UserService = require('./services/UserService');

const userEntity = require('./db/schemas/UserSchema');
const songEntity = require('./db/schemas/SongSchema');
const meetingEntity = require('./db/schemas/MeetingSchema');

const entitiyes = new Map();
entitiyes.set('User', userEntity);
entitiyes.set('Song', songEntity);
entitiyes.set('Meeting', meetingEntity);

const services = {
  MeetingService,
  SongService,
  UserService
};

module.exports.services = services;
module.exports.entitiyes = entitiyes;
