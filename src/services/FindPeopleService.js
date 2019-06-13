/* eslint-disable no-param-reassign */
const _ = require('lodash');

const getSongData = (song, amount) => ({
  genreId: song.genreId.id,
  genreName: song.genreId.name,
  amount: amount || 0,
});

const initialUsersGenres = (playlists) => {
  const usersSonsGenresArray = [];
  const usersId = _.uniq(_.map(playlists, 'userId.id'));
  _.forEach(usersId, (value) => {
    usersSonsGenresArray.push({
      userId: value,
      amountSongs: 0,
      songs: [],
    });
  });
  return usersSonsGenresArray;
};

const convertToPercentSongs = (songUserGenre) => {
  songUserGenre.forEach((songObject) => {
    songObject.songs.forEach((song) => {
      song.percent = Math.floor(song.amount * 100 / songObject.amountSongs);
    });
  });
  return songUserGenre;
};

const allSongUser = (userPlaylist) => {
  const songUserGenre = initialUsersGenres(userPlaylist);
  songUserGenre.forEach((userSong) => {
    userPlaylist.forEach((playlist) => {
      if (userSong.userId === playlist.userId.id) {
        playlist.songs.forEach((song) => {
          userSong.amountSongs += 1;
          if (userSong.songs.length === 0) {
            userSong.songs.push(getSongData(song));
          }
          let hasSongInUser = false;
          userSong.songs.forEach((songUser) => {
            if (songUser.genreId === song.genreId.id) {
              hasSongInUser = true;
            }
          });
          if (!hasSongInUser) {
            userSong.songs.push(getSongData(song, 1));
          } else {
            const index = _.findIndex(userSong.songs, (o => o.genreId === song.genreId.id));
            userSong.songs[index].amount += 1;
          }
        });
      }
    });
  });
  return convertToPercentSongs(songUserGenre);
};


module.exports.allSongUser = userPlaylist => allSongUser(userPlaylist);
