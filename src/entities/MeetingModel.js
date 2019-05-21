class Meeting {
  constructor(name, creatorId, time, cityId, address, statusId, genreId, authorId) {
    this.name = name;
    this.userId = creatorId;
    this.dateTime = time;
    this.cityId = cityId;
    this.address = address;
    this.statusId = statusId;
    this.genreId = genreId || null;
    this.authorId = authorId || null;
  }
}

module.exports = Meeting;
