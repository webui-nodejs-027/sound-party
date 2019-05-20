const express = require("express");
const UserController = require("../controllers/userController");
const User = require("../db/entities/UserSchema");

const router = express.Router();

const userController = new UserController(User);

router.get("/", userController.getAllData);

module.exports = router;
