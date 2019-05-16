class Playlist {
    constructor(playListName, user, typeOfPlayList, ...songs,) {
        this.name = playListName;
        this.songs = songs;
        this.user = user;
        this.typeOfPlayList = typeOfPlayList;
    }

    getNameToRepository() {
        return 'playlist';
    }
}

module.exports = Playlist;