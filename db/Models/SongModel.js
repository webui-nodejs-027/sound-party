class Song {
    constructor(songName, source, author, genre) {
        this.name = songName;
        this.source = source;
        this.author = author;
        this.genre = genre;
    }

    getNameToRepository() {
        return 'song';
    }
}

module.exports = Song;