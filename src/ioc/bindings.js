const { AsyncContainerModule } = require('inversify');
const { getRepository } = require('typeorm');
const {
  UserService,
  AuthorService,
  GenreService,
  PlaylistService,
  MeetingService,
  SongService,
  UserMeetingService,
  RoleService,
  StatusService,
} = require('../services');
const {
  UserEntity,
  AuthorEntity,
  GenreEntity,
  PlaylistEntity,
  MeetingEntity,
  SongEntity,
  UserMeetingEntity,
  RoleEntity,
  StatusEntity,
} = require('../entities');
const { TYPES } = require('../constants');

module.exports = new AsyncContainerModule((bind) => {
  bind(TYPES.UserRepository)
    .toDynamicValue(() => getRepository(UserEntity))
    .inRequestScope();
  bind(TYPES.UserService).to(UserService);

  bind(TYPES.AuthorRepository)
    .toDynamicValue(() => getRepository(AuthorEntity))
    .inRequestScope();
  bind(TYPES.AuthorService).to(AuthorService);

  bind(TYPES.GenreRepository)
    .toDynamicValue(() => getRepository(GenreEntity))
    .inRequestScope();
  bind(TYPES.GenreService).to(GenreService);

  bind(TYPES.PlaylistRepository)
    .toDynamicValue(() => getRepository(PlaylistEntity))
    .inRequestScope();
  bind(TYPES.PlaylistService).to(PlaylistService);

  bind(TYPES.MeetingRepository)
    .toDynamicValue(() => getRepository(MeetingEntity))
    .inRequestScope();
  bind(TYPES.MeetingService).to(MeetingService);

  bind(TYPES.SongRepository)
    .toDynamicValue(() => getRepository(SongEntity))
    .inRequestScope();
  bind(TYPES.SongService).to(SongService);

  bind(TYPES.UserMeetingRepository)
    .toDynamicValue(() => getRepository(UserMeetingEntity))
    .inRequestScope();
  bind(TYPES.UserMeetingService).to(UserMeetingService);

  bind(TYPES.RoleRepository)
    .toDynamicValue(() => getRepository(RoleEntity))
    .inRequestScope();
  bind(TYPES.RoleService).to(RoleService);

  bind(TYPES.StatusRepository)
    .toDynamicValue(() => getRepository(StatusEntity))
    .inRequestScope();
  bind(TYPES.StatusService).to(StatusService);
});
