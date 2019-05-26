class Playlist {
  constructor(name, userId, favourite, isMain) {
    this.name = name;
    // this.songs = songs;
    this.userId = userId;
    this.isMain = isMain;
    this.favourite = favourite;
  }
}

module.exports = Playlist;
