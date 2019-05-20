class Playlist {
  constructor(name, user, favourite, typeOfPlayList, songs) {
    this.name = name;
    this.songs = songs;
    this.favourite = favourite;
    this.user = user;
    this.typeofplaylist = typeOfPlayList;
  }
}

module.exports = Playlist;
