const express = require('express');
const UserController = require('../controllers/UserController');
const User = require('../db/schemas/UserSchema');

const router = express.Router();

const userController = new UserController(User);

router.get('/', userController.getAllData.bind(userController));

module.exports = router;
