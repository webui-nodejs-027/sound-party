const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Meeting',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
      nullable: false,
    },
    dateTime: {
      type: 'timestamp',
      nullable: false,
    },
    address: {
      type: 'varchar',
      nullable: false,
    },
    authorId: {
      type: 'int',
    },
    genreId: {
      type: 'int',
    },
    userId: {
      type: 'int',
    },
    cityId: {
      type: 'int',
    },
    statusId: {
      type: 'int',
    },
  },
  relations: {
    authorId: {
      type: 'many-to-one',
      joinColumn: { name: 'authorId' },
      target: 'Author',
      cascade: true,
    },
    genreId: {
      type: 'many-to-one',
      joinColumn: { name: 'genreId' },
      target: 'Genre',
      cascade: true,
    },
    userId: {
      type: 'many-to-one',
      joinColumn: { name: 'userId' },
      target: 'User',
      cascade: true,
    },
    cityId: {
      type: 'many-to-one',
      joinColumn: { name: 'cityId' },
      target: 'City',
      cascade: true,
    },
    statusId: {
      type: 'many-to-one',
      joinColumn: { name: 'statusId' },
      target: 'Status',
      cascade: true,
    },
  },
});
