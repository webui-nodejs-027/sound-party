/* eslint-disable no-param-reassign */
const inversify = require('inversify');
const _ = require('lodash');
const bcrypt = require('./BcService');
const { TYPES } = require('../constants');
const BaseService = require('./BaseService');
const { AppError } = require('../middlewares/ErrorHandlers');
const mailer = require('./MailerService');
const FindPeople = require('./FindPeopleService');

class UserService extends BaseService {
  constructor(repository, userMeetingService, meetingService, roleService, playlistService) {
    super(repository);
    this.userMeetingService = userMeetingService;
    this.meetingService = meetingService;
    this.roleService = roleService;
    this.playlistService = playlistService;
  }

  async getUserByEmail(email) {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async getUserMusicStatistic(idUser) {
    const allPlaylistsSong = await this.repository.manager
      .createQueryBuilder('Playlist', 'playlist')
      .innerJoinAndSelect('playlist.userId', 'user')
      .innerJoinAndSelect('playlist.songs', 'songs')
      .innerJoinAndSelect('songs.genreId', 'genre')
      .where('user.id =:userId', { userId: idUser })
      .getMany();

    idUser = Number(idUser);
    const userGenresPlaylists = _.remove(
      FindPeople.allSongUser(allPlaylistsSong),
      n => n.user.id === idUser,
    );

    return userGenresPlaylists;
  }

  async getUsersPercent(idUser) {
    this.getUserMusicStatistic(idUser);
    const allPlaylistsSong = await this.repository.manager
      .createQueryBuilder('Playlist', 'playlist')
      .innerJoinAndSelect('playlist.userId', 'user')
      .innerJoinAndSelect('playlist.songs', 'songs')
      .innerJoinAndSelect('songs.genreId', 'genre')
      .orderBy('user.id')
      .getMany();

    idUser = Number(idUser);
    const usersGenresPlaylists = _.remove(
      FindPeople.allSongUser(allPlaylistsSong),
      n => n.user.id !== idUser,
    );
    const userGenresPlaylists = _.remove(
      FindPeople.allSongUser(allPlaylistsSong),
      n => n.user.id === idUser,
    );
    const result = [];

    usersGenresPlaylists.forEach((user) => {
      const usersSongs = [];
      let allGanresArray = [];
      user.songs.forEach((song, index) => {
        allGanresArray.push(song);
        const sameGenre = _.findIndex(
          userGenresPlaylists[0].songs,
          x => x.genreId === song.genreId,
        );
        if (userGenresPlaylists[0].songs[sameGenre].percent < 20) {
          return;
        }
        if (sameGenre !== -1) {
          const diffencePrecent = Math.abs(
            userGenresPlaylists[0].songs[index].percent - song.percent,
          );
          if (diffencePrecent < 10) {
            usersSongs.push(song);
          }
        }
      });
      if (usersSongs.length > 0) {
        allGanresArray = _.uniqBy(
          _.concat(allGanresArray, userGenresPlaylists[0].songs),
          'genreId',
        );
        const sameMusicPercent = Math.floor(
          (usersSongs.length * 100) / allGanresArray.length,
        );
        result.push({
          user: user.user,
          sameMusicPercent,
          songs: usersSongs,
        });
      }
    });

    return result;
  }

  async insertUserData(content) {
    content.password = await bcrypt.hashPassword(content.password);
    const guestRole = await this.roleService.getAllData({ name: 'guest' });
    content.roleId = guestRole.data[0].id;
    const user = await this.repository.save(content);
    if (!user) {
      throw new AppError('Add user error');
    }
    const mainPlaylist = {
      name: 'My Songs',
      isMain: true,
      favourite: true,
      userId: user.id,
    };
    await this.playlistService.insertData(mainPlaylist);
    return user;
  }

  async changePassword(id, oldPassword, password) {
    const user = await this.getById(id);
    const comparePassword = await bcrypt.comparePassword(
      oldPassword,
      user.password,
    );
    if (!comparePassword) {
      throw new AppError('Password is incorrect');
    }
    const result = await this.updateById(id, password);
    return result;
  }

  async mailCheck(email) {
    const user = await this.getUserByEmail(email);
    if (user) {
      throw new AppError('This email is already taken', 400);
    }
    return { message: 'ok' };
  }

  async sendConfirm(id) {
    const user = await this.getById(id);
    if (!user) {
      throw new AppError('There are is no user with such id', 400);
    }
    return mailer.sendConfirmation(user.id, user.email);
  }

  async userConfirm(token) {
    const decodedToken = mailer.verifyToken(token);
    const userRole = await this.roleService.getAllData({ name: 'user' });
    await this.updateById(decodedToken.id, { roleId: userRole.data[0].id });
    return { message: 'Email confirmed' };
  }

  async subscribeOnMeeting(req) {
    const userMeeting = {
      isCreator: false,
      meetingId: parseInt(req.body.meetingId, 10),
      userId: parseInt(req.params.id, 10),
    };

    const inMeeting = await this.meetingService.getById(req.body.meetingId);
    if (!inMeeting) {
      throw new AppError(
        `can't find meeting with id:${req.body.meetingId} in DataBase`,
      );
    }

    const inUser = await this.userMeetingService.getById(req.params.id);
    if (!inUser) {
      throw new AppError(
        `can't find user with id:${req.params.id} in DataBase`,
      );
    }

    const subscribed = await this.userMeetingService.checkIfSubscribed(
      userMeeting,
    );
    if (subscribed) {
      throw new AppError(`Error! user with id: 
      ${req.params.id} is already subscribed on meeting with id:${
  req.body.meetingId
}`);
    }

    this.userMeetingService.save(userMeeting);
    return `user with id:${req.params.id} was successfully subscribed 
    on meeting with id:${req.body.meetingId}`;
  }

  async sendTokenForReset(email) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new AppError('There are is no user with such email', 400);
    }
    return mailer.sendResetLink(user.id, user.email);
  }

  async passwordReset(token) {
    const decodedToken = mailer.verifyToken(token);
    let password = '';
    let randomCharCode;
    for (let i = 0; i < 20; i += 1) {
      randomCharCode = Math.floor(Math.random() * (91 - 48)) + 48;
      password += String.fromCharCode(randomCharCode);
    }
    const hashedPassword = await bcrypt.hashPassword(password);
    await this.updateById(decodedToken.id, { password: hashedPassword });
    await mailer.sendPassword(decodedToken.email, password);
    return { message: 'New password was sent on email' };
  }
}

inversify.decorate(inversify.injectable(), UserService);
inversify.decorate(inversify.inject(TYPES.UserRepository), UserService, 0);
inversify.decorate(inversify.inject(TYPES.UserMeetingService), UserService, 1);
inversify.decorate(inversify.inject(TYPES.MeetingService), UserService, 2);
inversify.decorate(inversify.inject(TYPES.RoleService), UserService, 3);
inversify.decorate(inversify.inject(TYPES.PlaylistService), UserService, 4);
module.exports = UserService;
