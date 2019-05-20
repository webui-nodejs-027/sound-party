const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Song',
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
    source: {
      type: 'varchar',
      nullable: false,
    },
    year: {
      type: 'int',
    },
  },
  relations: {
    author: {
      type: 'many-to-one',
      target: 'Author',
      joinColumn: { name: 'authorId' },
      cascade: true,
    },
    genre: {
      type: 'many-to-one',
      target: 'Genre',
      joinColumn: { name: 'genreId' },
      cascade: true,
    },
  },
});
