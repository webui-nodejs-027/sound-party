const { createConnection } = require('typeorm');
const crypto = require('crypto');
const config = require('./config/dbconfig');

config.entities = ['./src/entities/*.js'];

const AuthorEntity = require('./src/entities/AuthorEntity');
const CityEntity = require('./src/entities/CityEntity');
const GenreEntity = require('./src/entities/GenreEntity');
const MeetingEntity = require('./src/entities/MeetingEntity');
const PlaylistEntity = require('./src/entities/PlaylistEntity');
const RoleEntity = require('./src/entities/RoleEntity');
const SongEntity = require('./src/entities/SongEntity');
const StatusEntity = require('./src/entities/StatusEntity');
const UserEntity = require('./src/entities/UserEntity');
const UserMeetingEntity = require('./src/entities/UserMeetingEntity');


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
    {name: 'admin'},
    {name: 'user'},
    {name: 'guest'},
  ];
  await connection
    .getRepository(RoleEntity)
    .save(roles);
  for (let i = 0; i < 10; i += 1) {
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
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      birthday: birthday,
      gender: gender,
      socialLink: SL,
      roleId: roleId,
      };
    users.push(user);
  }
  await connection
    .getRepository(UserEntity)
    .save(users);
  return users;
}

async function initializeAuthor(connection) {
  const authors = [
    { name: 'David Bowie'},
    { name: 'Aleksandr Vasiliev'},
    { name: 'Kurt Cobain'}
  ];
  await connection
    .getRepository(AuthorEntity)
    .save(authors);
  return authors;
}

async function initializeGenre(connection) {
  const genres = [
    { name: 'rock'},
    { name: 'pop'},
    { name: 'rap'}
  ];
  await connection
    .getRepository(GenreEntity)
    .save(genres);
  return genres;
}

async function initializeSong(connection, authors, genres) {
  const songs = [];
  for (let i = 0; i < 11; i += 1) {
    const songName = `Song${i}`;
    const source = `file://localhost/d:/storage/song${i}.mp3`;
    const year = `${getRndmNum(1980, 2011)}`;
    const song = {
      name: songName,
      source: source,
      year: year,
      authorId: authors[getRndmNum(0, 3)].id,
      genreId: genres[getRndmNum(0, 3)].id,
    };
    songs.push(song);
  }
  await connection
    .getRepository(SongEntity)
    .save(songs);
  return songs;
}

async function initializePlaylist(connection, users, songs) {
  let playlists = [];
  for (let i = 0; i < 10; i += 1) {
    const user = users[i];
    const name = `${user.firstName}\`s playlist`;

    const playlistNF = {
      name: name,
      userId: user.id,
      favourite: false,
      isMain: true,
      songs: songs,
    };
    const playlistF = {
        name: name,
        userId: user.id,
        favourite: true,
        isMain: false,
        songs: songs,
      };
    playlists = [...playlists, playlistF, playlistNF];
  }
  await connection
    .getRepository(PlaylistEntity)
    .save(playlists);
}


async function initializeCity(connection) {
  const cities = [
    {name: 'Izium'},
    {name: 'Kharkov'},
    {name: 'Kiev'},
    {name: 'Lvov'},
    {name: 'Dnepr'}
  ];

  await connection
    .getRepository(CityEntity)
    .save(cities);
  return cities;
}

async function initializeStatus(connection) {
  const statuses = [
    {name: 'finished'},
    {name: 'canceled'},
    {name: 'pending'}
  ];
  await connection
    .getRepository(StatusEntity)
    .save(statuses);
  return statuses;
}

async function initializeMeeting(connection, authors, genres, cities, statuses) {
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
  for (let i = 0; i < 10; i += 1) {
    const name = `${adjectives[getRndmNum(0, 8)]} ${nouns[getRndmNum(0, 5)]}`;
    const dateTime = `2019-06-${getRndmNum(1, 31)} 12:00:00`;
    const address = `Party str., ${i}`;
    const author = authors[getRndmNum(0, 3)];
    const genre = genres[getRndmNum(0, 3)];
    const city = cities[getRndmNum(0, 5)];
    const status = statuses[getRndmNum(0, 3)];
    const meeting = {
        name: name,
        dateTime: dateTime,
        cityId: city.id,
        address: address,
        statusId: status.id,
        genreId: genre.id,
        authorId: author.id,
  };
    meetings.push(meeting);
  }
  await connection
    .getRepository(MeetingEntity)
    .save(meetings);
  return meetings;
}

async function initializeUserMeting(connection, users, meetings) {
  const ums = [];
  for (let i = 0; i < 10; i += 1) {
    const meetingId = meetings[i].id;
    for (let j = 0; j < 10; j += 1) {
      const isCreator = j % 10 === 0;
      const userId = users[j].id;
      const um = {
        isCreator: isCreator,
        userId: userId,
        meetingId: meetingId};
      ums.push(um);

    }
  }
  await connection
    .getRepository(UserMeetingEntity)
    .save(ums);
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
    const cities = await initializeCity(connection);
    const statuses = await initializeStatus(connection);
    const meetings = await initializeMeeting(
      connection,
      authors,
      genres,
      cities,
      statuses,
    );
    await initializeUserMeting(connection, users, meetings);
  } catch (e) {
    throw e;
  } finally {
    await connection.close();
  }
}

initialize()
  .then(() => console.log('Database filled up'))
  .catch(err => console.error(err));
