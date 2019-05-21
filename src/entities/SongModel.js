class Song {
  constructor(songName, source, year, authorId, genreId) {
    this.name = songName;
    this.source = source;
    this.year = year;
    this.authorId = authorId;
    this.genreId = genreId;
  }
}

module.exports = Song;
