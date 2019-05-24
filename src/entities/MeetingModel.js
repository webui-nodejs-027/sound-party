class Meeting {
  constructor(name, time, city, address, status, genre, author) {
    this.name = name;
    this.dateTime = time;
    this.cityId = city;
    this.address = address;
    this.statusId = status;
    this.genreId = genre || null;
    this.authorId = author || null;
  }
}

module.exports = Meeting;
