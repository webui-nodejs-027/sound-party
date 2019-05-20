class TypeOfPlaylist {
  constructor(genreName) {
    this.name = genreName;
  }

  static getNameToRepository() {
    return `type_of_playlist`;
  }
}

module.exports = TypeOfPlaylist;
