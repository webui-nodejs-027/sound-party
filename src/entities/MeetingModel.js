class Meeting {
  constructor(name, creator, time, city, address, status, genre, author) {
    this.name = name;
    this.userId = creator;
    this.dateTime = time;
    this.cityId = city;
    this.address = address;
    this.statusId = status;
    this.genreId = genre || null;
    this.authorId = author || null;
  }
}

module.exports = Meeting;
