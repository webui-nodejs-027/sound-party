const express = require('express');
const meetingController = require('../controllers/MeetingController');
const {
  checkId,
  checkBody,
  checkFindQuery,
} = require('../validators/meetingValidator');
const errorWrap = require('../middlewares/appMiddlewares/errorWrap');

const router = express.Router();

router.use('/:id', checkId);

router.get(
  '/',
  checkFindQuery,
  errorWrap(meetingController.getMeetingsList.bind(meetingController)),
);
router.get(
  '/:id',
  errorWrap(meetingController.getById.bind(meetingController)),
);
router.post(
  '/',
  checkBody,
  errorWrap(meetingController.createMeeting.bind(meetingController)),
);

router.put(
  '/:id',
  checkBody,
  errorWrap(meetingController.updateMeeting.bind(meetingController)),
);
router.delete(
  '/:id',
  errorWrap(meetingController.deleteById.bind(meetingController)),
);

module.exports = router;
