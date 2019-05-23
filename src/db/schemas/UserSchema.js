const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'User',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    firstName: {
      type: 'varchar',
      nullable: false
    },
    lastName: {
      type: 'varchar',
      nullable: false
    },
    email: {
      type: 'varchar',
      unique: true,
      nullable: false
    },
    password: {
      type: 'varchar',
      nullable: false
    },
    birthday: {
      type: 'date'
    },
    gender: {
      type: 'varchar'
    },
    socialLink: {
      type: 'varchar'
    },
    roleId: {
      type: 'int'
    }
  },
  relations: {
    playlist: {
      type: 'one-to-many',
      target: 'Playlist',
      joinColumn: { name: 'playlistId' }
    },
    role: {
      type: 'many-to-one',
      target: 'Role',
      joinColumn: { name: 'roleId' },
      cascade: true
    }
  }
});
