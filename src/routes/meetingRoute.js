const express = require('express');
const meetingController = require('../controllers/MeetingController');
const {
  checkId,
  checkBody,
  checkFindQuery,
} = require('../validators/meetingValidator');

const router = express.Router();

router.use('/:id', checkId);

router.get(
  '/',
  checkFindQuery,
  meetingController.getMeetingsList.bind(meetingController),
);
router.get('/:id', meetingController.getById.bind(meetingController));
router.post(
  '/',
  checkBody,
  meetingController.createMeeting.bind(meetingController),
);

router.put(
  '/:id',
  checkBody,
  meetingController.updateMeeting.bind(meetingController),
);
router.delete('/:id', meetingController.deleteById.bind(meetingController));

module.exports = router;
