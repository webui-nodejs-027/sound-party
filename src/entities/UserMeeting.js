class UserMeeting {
  // eslint-disable-next-line no-useless-constructor
  constructor(iscreator, userId, meetingid) {
    this.isCreator = iscreator;
    this.userId = userId;
    this.meetingId = meetingid;
  }
}

module.exports = UserMeeting;
