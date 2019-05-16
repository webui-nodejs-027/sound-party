class Genre {
    constructor(genreName) {
        this.name = genreName;
    }

    getNameToRepository() {
        return 'genre';
    }
}

module.exports = Genre;