class Playlist {
  constructor(playListName, user, typeOfPlayList, songs) {
    this.name = playListName;
    this.songs = songs;
    this.user = user;
    this.typeOfPlayList = typeOfPlayList;
  }
}

module.exports = Playlist;
