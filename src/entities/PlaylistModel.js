class Playlist {
  constructor(name, userId, favourite, typeOfPlayList, songs) {
    this.name = name;
    this.songs = songs;
    this.favourite = favourite;
    this.userId = userId;
    this.typeOfPlayList = typeOfPlayList;
  }
}

module.exports = Playlist;
