const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'UserMeeting',
  columns: {
    isCreator: {
      type: 'boolean',
      default: false
    },
    meetingId: {
      primary: true,
      type: 'int'
    },
    userId: {
      primary: true,
      type: 'int'
    }
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: { name: 'userId' },
      cascade: true
    },
    meeting: {
      type: 'many-to-one',
      target: 'Meeting',
      joinColumn: { name: 'meetingId' },
      cascade: true,
      onDelete: 'CASCADE'
    }
  }
});
