const express = require('express');
const meetingController = require('../controllers/MeetingController');
const validator = require('../validators/meetingValidator');

const router = express.Router();

router.use('/:id', validator.checkId /* checkIdInDb */);

router.get('/', meetingController.getAllData.bind(meetingController));
router.get('/:id', meetingController.getById.bind(meetingController));
router.post(
  '/',
  validator.checkBody,
  meetingController.createMeeting.bind(meetingController)
);

router.put(
  '/:id',
  validator.checkBody,
  meetingController.updateMeeting.bind(meetingController)
);

router.delete('/:id', meetingController.deleteById.bind(meetingController));

// router.get('/', validator.checkFindQuery, meetingController.findMeeting.bind(meetingController));

module.exports = router;
