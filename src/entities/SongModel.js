class Song {
  constructor(songName, source, year, author, genre) {
    this.name = songName;
    this.source = source;
    this.authorId = author;
    this.genreId = genre;
    this.year = year;
  }
}

module.exports = Song;
