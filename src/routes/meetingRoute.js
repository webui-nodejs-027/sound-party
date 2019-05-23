const express = require('express');
const meetingController = require('../controllers/MeetingController');

const router = express.Router();

router.get('/', meetingController.getAllData.bind(meetingController));
router.get('/:id', meetingController.getById.bind(meetingController));

router.post('/', meetingController.createMeeting.bind(meetingController));
router.put('/:id', meetingController.updateMeeting.bind(meetingController));
router.delete('/:id', meetingController.deleteById.bind(meetingController));

module.exports = router;
