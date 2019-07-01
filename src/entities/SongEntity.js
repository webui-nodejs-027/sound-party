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
      nullable: true,
    },
    year: {
      type: 'int',
    },
    authorId: {
      type: 'int',
    },
    genreId: {
      type: 'int',
    },
  },
  relations: {
    authorId: {
      type: 'many-to-one',
      target: 'Author',
      joinColumn: { name: 'authorId' },
      cascade: true,
      onDelete: 'CASCADE',
    },
    genreId: {
      type: 'many-to-one',
      target: 'Genre',
      joinColumn: { name: 'genreId' },
      cascade: true,
      onDelete: 'CASCADE',
    },
  },
});
