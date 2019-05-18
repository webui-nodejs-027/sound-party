const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: "Role",
    columns: {
        idRole: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar",
            nullable: false
        }
    }, relations: {
        author: {
            type: `one-to-one`,
            target: `User`,
            joinColumn: true,
            cascade: true
        },
    }
});
