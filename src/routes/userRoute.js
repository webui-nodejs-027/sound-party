const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();

router.get('/', userController.getAllData.bind(userController));
router.get('/:id', userController.getById.bind(userController));
router.delete('/:id', userController.deleteById.bind(userController));
router.post('/', userController.create.bind(userController));
module.exports = router;
