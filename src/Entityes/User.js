const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: "User",
    columns: {
        idUser: {
            primary: true,
            type: "int",
            generated: true
        },
        firstName: {
            type: "varchar",
            nullable: false
        },
        lastName: {
            type: "varchar",
            nullable: false
        },
        email: {
            type: "varchar",
            unique: true,
            nullable: false,
        },
        password: {
            type: "varchar",
            nullable: false
        }
    },
    relations: {
        playlist: {
            type: 'one-to-many',
            target: 'Playlist',
            joinColumn: true
        },
    }
});
