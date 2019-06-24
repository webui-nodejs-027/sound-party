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
      type: 'timestamptz',
      nullable: true,
    },
    address: {
      type: 'varchar',
      nullable: false,
    },
    authorId: {
      type: 'int',
      nullable: true,
    },
    genreId: {
      type: 'int',
      nullable: true,
    },
    cityId: {
      type: 'int',
    },
    statusId: {
      type: 'int',
    },
  },
  relations: {
    author: {
      type: 'many-to-one',
      joinColumn: { name: 'authorId' },
      target: 'Author',
      cascade: true,
    },
    genre: {
      type: 'many-to-one',
      joinColumn: { name: 'genreId' },
      target: 'Genre',
      cascade: true,
    },
    city: {
      type: 'many-to-one',
      joinColumn: { name: 'cityId' },
      target: 'City',
      cascade: true,
      onDelete: 'CASCADE',
    },
    status: {
      type: 'many-to-one',
      joinColumn: { name: 'statusId' },
      target: 'Status',
      cascade: true,
    },
  },
});
