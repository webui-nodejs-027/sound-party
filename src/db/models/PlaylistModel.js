class Playlist {
  constructor(name, user, typeOfPlayList, songs) {
    this.name = name;
    this.songs = songs;
    this.user = user;
    this.typeOfPlayList = typeOfPlayList;
  }
}

module.exports = Playlist;
