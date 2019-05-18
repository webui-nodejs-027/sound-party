const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: "Meeting",
    columns: {
        idMeeting: {
            primary: true,
            type: `int`,
            generated: true
        },
        name: {
            type: `varchar`,
            nullable: false
        },
        dateTime: {
            type: `timestamp`,
            nullable: false
        },
        adress: {
            type: `varchar`,
            nullable: false
        }
    },
    relations: {
        author: {
            type: `many-to-one`,
            target: `Author`,
            joinColumn: true,
            cascade: true
        },
        genre: {
            type: `many-to-one`,
            target: `Genre`,
            joinColumn: true,
            cascade: true
        },
        userId: {
            type: `many-to-one`,
            target: `User`,
            joinColumn: true,
            cascade: true
        },
        cityId: {
            type: `many-to-one`,
            target: `City`,
            joinColumn: true,
            cascade: true
        },
        statusId: {
            type: `many-to-one`,
            target: `Status`,
            joinColumn: true,
            cascade: true
        }
    }
});
