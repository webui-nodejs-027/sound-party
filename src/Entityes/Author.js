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
    }
});
