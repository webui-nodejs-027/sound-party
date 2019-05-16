const typeorm = require('typeorm');
const TypeOfPlaylist = require('./db/Models/TypeOfPlaylistModel');
const Author = require('./db/Models/AuthorModel');

let express = require('express');
let app = express();

typeorm.createConnection().then(async connection => {

    console.log(`Connect to DB`);
    let author = new Author('Hello');
    let typeOfListRepository = await connection.getRepository(TypeOfPlaylist.getNameToRepository());
    await typeOfListRepository.save(author);

    app.listen(3000, () => {
        console.log(`Server created`);
    });

});
