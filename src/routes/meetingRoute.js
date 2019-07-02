const express = require('express');
const meetingController = require('../controllers/MeetingController');
const {
  checkId,
  checkBody,
  checkStatusId,
  checkUserInQuery,
} = require('../validators/meetingValidator');
const errorWrap = require('../middlewares/appMiddlewares/errorWrap');
const checkToken = require('../middlewares/appMiddlewares/checkToken');
const checkAccess = require('../middlewares/appMiddlewares/checkAccess');
const { ROLES } = require('../constants');

const router = express.Router();

router.use('/:id', checkId);

router.get(
  '/',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  errorWrap(meetingController.getAllData.bind(meetingController)),
);

router.get(
  '/:id',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  checkUserInQuery,
  errorWrap(meetingController.getById.bind(meetingController)),
);

router.post(
  '/',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  checkBody,
  errorWrap(meetingController.createMeeting.bind(meetingController)),
);

router.put(
  '/:id',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  checkBody,
  checkStatusId,
  errorWrap(meetingController.updateMeeting.bind(meetingController)),
);

router.delete(
  '/:id',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  errorWrap(meetingController.deleteById.bind(meetingController)),
);

module.exports = router;
