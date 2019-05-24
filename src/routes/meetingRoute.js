const express = require('express');
const meetingController = require('../controllers/MeetingController');

const router = express.Router();

router.get('/', meetingController.getAllData.bind(meetingController));
router.get('/:id', meetingController.getById.bind(meetingController));
router.post('/', meetingController.createMeeting.bind(meetingController));
router.put('/:id', meetingController.updateMeeting.bind(meetingController));
router.delete('/:id', meetingController.deleteById.bind(meetingController));

module.exports = router;

/*
city
  validation
    строка
    не пусто
  middleware

status
  validation
    строка
    не пусто
  middleware
    есть ли значение в таблице

creator
  validation
    число
    не пусто

  middleware

genre
  validation
    строка
    не пусто

  middleware
    есть ли значение в таблице

author
  validation
    строка
    не пусто
middleware
    есть ли значение в таблице

dateTime
  validation
    проверка на dateTime(формат)
    не пусто
  middleware

address
  validation
    строка
    не пусто
  middleware

name
  validation
    строка
    не пусто
  middleware
*/