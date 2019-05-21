class Playlist {
  constructor(name, songs, favourite, isMain, userId) {
    this.name = name;
    this.songs = songs;
    this.favourite = favourite;
    this.isMain = isMain;
    this.userId = userId;
  }
}

module.exports = Playlist;
