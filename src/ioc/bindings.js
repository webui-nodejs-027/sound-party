const { AsyncContainerModule } = require('inversify');
const { getRepository } = require('typeorm');
const {
  UserService,
  AuthorService,
  GenreService,
  PlaylistService,
  MeetingService,
  SongService,
} = require('../services');
const {
  UserEntity,
  AuthorEntity,
  GenreEntity,
  PlaylistEntity,
  MeetingEntity,
  SongEntity,
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
});
