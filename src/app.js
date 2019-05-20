const typeorm = require("typeorm");
const express = require("express");
const TypeOfPlaylist = require("./db/Models/TypeOfPlaylistModel");
const Author = require("./db/Models/AuthorModel");

const app = express();

typeorm.createConnection().then(async connection => {
  console.log("Connect to DB");
  const author = new Author("Hello");
  const typeOfListRepository = await connection.getRepository(
    TypeOfPlaylist.getNameToRepository()
  );
  await typeOfListRepository.save(author);

  app.listen(3000, () => {
    console.log("Server created");
  });
});
