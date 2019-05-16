const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: "Song",
    columns: {
        idPSong: {
            primary: true,
            type: `int`,
            generated: true
        },
        name: {
            type: `varchar`,
            nullable: false
        },
       source: {
            type: `varchar`,
            nullable: false
        }
    },
    relations: {
        author: {
            type: `many-to-one`,
            target: `Author`,
            joinColumn: true,
            cascade:true
        },
        genre: {
            type: `many-to-one`,
            target: `Genre`,
            joinColumn: true,
            cascade:true
        },
    }
});
