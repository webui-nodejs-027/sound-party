const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Author',
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
      joinColumn: { name: 'authorId' },
      target: 'Song',
      cascade: true
    },
    meeting: {
      type: 'one-to-many',
      joinColumn: { name: 'authorId' },
      target: 'Meeting',
      cascade: true
    }
  }
});
