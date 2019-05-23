const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Playlist',
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
    favourite: {
      type: 'boolean',
      default: false,
    },
    isMain: {
      type: 'boolean',
      default: false,
    },
    userId: {
      type: 'int',
    },
  },
  relations: {
    song: {
      target: 'Song',
      type: 'many-to-many',
      joinTable: true,
      cascade: true,
    },
    userId: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: true,
      cascade: true,
    },
  },
});
