const { createConnection } = require('typeorm');
const crypto = require('crypto');
const config = require('./config/dbconfig');

const AuthorSchema = require('./src/db/entities/AuthorSchema');
const CitySchema = require('./src/db/entities/CitySchema');
const GenreSchema = require('./src/db/entities/GenreSchema');
const MeetingSchema = require('./src/db/entities/MeetingSchema');
const PlaylistSchema = require('./src/db/entities/PlaylistSchema');
const RoleSchema = require('./src/db/entities/RoleSchema');
const SongSchema = require('./src/db/entities/SongSchema');
const StatusSchema = require('./src/db/entities/StatusSchema');
const TypeOfPlaylistSchema = require('./src/db/entities/TypeOfPlaylistSchema');
const UserSchema = require('./src/db/entities/UserSchema');

const Author = require('./src/db/models/AuthorModel');
const City = require('./src/db/models/CityModel');
const Genre = require('./src/db/models/GenreModel');
const Meeting = require('./src/db/models/MeetingModel');
const Playlist = require('./src/db/models/PlaylistModel');
const Role = require('./src/db/models/RoleModel');
const Song = require('./src/db/models/SongModel');
const Status = require('./src/db/models/StatusModel');
const TypeOfPlaylist = require('./src/db/models/TypeOfPlaylistModel');
const User = require('./src/db/models/UserModel');

function getRndmNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

async function initializeUser(connection) {
  const firstNames = [
    'John',
    'Aleksandr',
    'Arnold',
    'Vincent',
    'Peter',
    'Anna',
    'Roy',
    'James',
    'Joseph',
  ];
  const lastNames = [
    'Doe',
    'Snow',
    'Schwarzenegger',
    'Fleming',
    'Vega',
    'Jackson',
    'Batty',
    'Howlett',
    'Brodsky',
  ];
  const users = [];
  const roles = [
    new Role('admin'),
    new Role('user'),
  ];
  await connection
    .getRepository(RoleSchema)
    .save(roles);
  for (let i = 0; i < 10; i++) {
    const firstName = firstNames[getRndmNum(0, 9)];
    const lastName = lastNames[getRndmNum(0, 9)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase() + i}@gmail.com`;
    const password = crypto
      .createHash('sha256')
      .update(`Pass${getRndmNum(1000, 10000)}wo${i}rd`)
      .digest('base64');
    const birthday = `1995-03-${getRndmNum(1, 32)}`;
    const gender = firstName === 'Anna' ? 'female' : 'male';
    const SL = `https://www.instagram.com/${firstName.toLowerCase()}_${lastName.toLowerCase()}`;
    const roleId = i ? roles[1].id : roles[0].id;
    const user = new User(
      firstName,
      lastName,
      email,
      password,
      birthday,
      gender,
      SL,
      roleId,
    );
    users.push(user);
  }
  await connection
    .getRepository(UserSchema)
    .save(users);
  return users;
}

async function initializeAuthor(connection) {
  const authors = [
    new Author('David Bowie'),
    new Author('Aleksandr Vasiliev'),
    new Author('Kurt Cobain'),
  ];
  await connection
    .getRepository(AuthorSchema)
    .save(authors);
  return authors;
}

async function initializeGenre(connection) {
  const genres = [
    new Genre('rock'),
    new Genre('pop'),
    new Genre('rap'),
  ];
  await connection
    .getRepository(GenreSchema)
    .save(genres);
  return genres;
}

async function initializeSong(connection, authors, genres) {
  const songs = [];
  for (let i = 0; i < 11; i++) {
    const songName = `Song${i}`;
    const source = `file://localhost/d:/storage/song${i}.mp3`;
    const year = `${getRndmNum(1980, 2011)}`;
    const song = new Song(
      songName,
      source,
      year,
      authors[getRndmNum(0, 3)].id,
      genres[getRndmNum(0, 3)].id,
    );
    songs.push(song);
  }
  await connection
    .getRepository(SongSchema)
    .save(songs);
  return songs;
}

async function initializePlaylist(connection, users, songs) {
  const typesOfPlaylist = [
    new TypeOfPlaylist(true),
    new TypeOfPlaylist(false),
  ];
  await connection
    .getRepository(TypeOfPlaylistSchema)
    .save(typesOfPlaylist);
  let playlists = [];
  for (let i = 0; i < 10; i++) {
    const user = users[i];
    const name = `${user.firstName}\`s playlist`;
    const playlistNF = new Playlist(
      name,
      user.id,
      false,
      typesOfPlaylist[0].id,
      [songs[i], songs[i + 1]],
    );
    const playlistF = new Playlist(
      name,
      user.id,
      true,
      typesOfPlaylist[1].id,
      [songs[i], songs[i + 1]],
    );
    playlists = [...playlists, playlistF, playlistNF];
  }
  await connection
    .getRepository(PlaylistSchema)
    .save(playlists);
}

async function initiaizeCity(connection) {
  const cities = [
    new City('Izium'),
    new City('Kharkov'),
    new City('Kiev'),
    new City('Lvov'),
    new City('Dnepr'),
  ];
  await connection
    .getRepository(CitySchema)
    .save(cities);
  return cities;
}

async function initialiseStatus(connection) {
  const statuses = [
    new Status('finished'),
    new Status('canceled'),
    new Status('pending'),
  ];
  await connection
    .getRepository(StatusSchema)
    .save(statuses);
  return statuses;
}

async function initializeMeeting(connection, authors, genres, users, cities, statuses) {
  const adjectives = [
    'awesome',
    'great',
    'rave',
    'alcoholic',
    'crazy',
    'illegal',
    'musical',
    'classical',
  ];
  const nouns = [
    'meeting',
    'party',
    'concert',
    'get-together',
    'disco',
  ];
  const meetings = [];
  for (let i = 0; i < 10; i++) {
    const name = `${adjectives[getRndmNum(0, 8)]} ${nouns[getRndmNum(0, 5)]}`;
    const dateTime = `2019-06-${getRndmNum(1, 31)} 12:00:00`;
    const address = `Party str., ${i}`;
    const author = authors[getRndmNum(0, 3)];
    const genre = genres[getRndmNum(0, 3)];
    const creator = users[getRndmNum(0, 10)];
    const city = cities[getRndmNum(0, 5)];
    const status = statuses[getRndmNum(0, 3)];
    const meeting = new Meeting(
      name,
      creator.id,
      dateTime,
      city.id,
      address,
      status.id,
      genre.id,
      author.id,
    );
    meetings.push(meeting);
  }
  await connection
    .getRepository(MeetingSchema)
    .save(meetings);
}

async function clearDB() {
  const connection = await createConnection(config);
  const queryRunner = connection
    .createQueryRunner();
  await queryRunner.clearDatabase();
  await connection.close();
}

async function initialize() {
  await clearDB();
  const connection = await createConnection(config);
  try {
    const users = await initializeUser(connection);
    const authors = await initializeAuthor(connection);
    const genres = await initializeGenre(connection);
    const songs = await initializeSong(connection, authors, genres);
    await initializePlaylist(connection, users, songs);
    const cities = await initiaizeCity(connection);
    const statuses = await initialiseStatus(connection);
    await initializeMeeting(
      connection,
      authors,
      genres,
      users,
      cities,
      statuses,
    );
  } catch (e) {
    throw e;
  } finally {
    await connection.close();
  }
}

initialize()
  .then(() => console.log('Database filled up'))
  .catch(err => console.error(err));
