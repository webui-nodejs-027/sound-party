class Playlist {
  constructor(name, userId, isMain, favourite) {
    this.name = name;
    // this.songs = songs;
    this.userId = userId;
    this.isMain = isMain;
    this.favourite = favourite;
  }
}

module.exports = Playlist;
