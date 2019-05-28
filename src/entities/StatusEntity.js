const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Status',
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
  },
  relations: {
    meeting: {
      type: 'one-to-many',
      joinColumn: { name: 'statusId' },
      target: 'Meeting',
      cascade: true,
    },
  },
});
