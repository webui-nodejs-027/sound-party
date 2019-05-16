const EntitySchema = require('typeorm').EntitySchema;
const TypeOfListModel = require('../../db/Models/TypeOfPlaylistModel');

module.exports = new EntitySchema( {
    name: "TypeOfPlaylist",
    target : TypeOfListModel,
    columns: {
        idType: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar",
            nullable : false
        }
    },
    relations: {
        playlist: {
            type: `one-to-one`,
            target: `Playlist`,
            joinColumn: true,
            cascade:true
        },
    }
});
