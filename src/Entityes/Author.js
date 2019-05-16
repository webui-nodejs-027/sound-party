const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema( {
    name: "Author",
    columns: {
        idAuthor: {
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
        song: {
            type: `one-to-one`,
            target: `Song`,
            joinColumn: true,
            cascade:true
        },
    }
});
