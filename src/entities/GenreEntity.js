const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Genre',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    name: {
      type: 'varchar',
      nullable: false
    }
  },
  relations: {
    song: {
      type: 'one-to-many',
      joinColumn: { name: 'genreId' },
      target: 'Song',
      cascade: true
    },
    meeting: {
      type: 'one-to-many',
      joinColumn: { name: 'genreId' },
      target: 'Meeting',
      cascade: true
    }
  }
});
