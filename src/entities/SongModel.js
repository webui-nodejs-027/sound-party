class Song {
  constructor(songName, source, year, author, genre) {
    this.name = songName;
    this.source = source;
    this.year = year;
    this.authorId = author;
    this.genreId = genre;
  }
}

module.exports = Song;
