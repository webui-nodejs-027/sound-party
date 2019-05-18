const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema( {
    name: "Status",
    columns: {
        idCity: {
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
