const express = require('express');
const meetingController = require('../controllers/MeetingController');
const { checkId, checkBody } = require('../validators/meetingValidator');
const errorWrap = require('../middlewares/appMiddlewares/errorWrap');
const checkToken = require('../middlewares/appMiddlewares/checkToken');

const router = express.Router();

router.use('/:id', checkId);

router.get(
  '/',
  checkToken,
  errorWrap(meetingController.getAllData.bind(meetingController))
);

router.get(
  '/:id',
  checkToken,
  errorWrap(meetingController.getById.bind(meetingController))
);

router.post(
  '/',
  checkToken,
  checkBody,
  errorWrap(meetingController.createMeeting.bind(meetingController))
);

router.put(
  '/:id',
  checkToken,
  checkBody,
  errorWrap(meetingController.updateMeeting.bind(meetingController))
);

router.delete(
  '/:id',
  checkToken,
  errorWrap(meetingController.deleteById.bind(meetingController))
);

module.exports = router;
