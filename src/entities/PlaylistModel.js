class Playlist {
  constructor(name, userId, favourite, typeOfPlayList, songs) {
    this.name = name;
    this.songs = songs;
    this.userId = userId;
    this.typeOfPlayList = typeOfPlayList;
    this.favourite = favourite;
  }
}

module.exports = Playlist;
