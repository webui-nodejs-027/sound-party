class Meeting {
  constructor(name, creator, time, city, address, status, genre, author) {
    this.name = name;
    this.user = creator;
    this.dateTime = time;
    this.city = city;
    this.address = address;
    this.status = status;
    this.genre = genre || null;
    this.author = author || null;
  }
}

module.exports = Meeting;
