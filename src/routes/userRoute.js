const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();

router.get('/', userController.getAllData.bind(userController));
router.get('/:id', userController.getById.bind(userController));
router.delete('/:id', userController.deleteById.bind(userController));
router.post('/createUser', userController.createUser.bind(userController));
router.put('/:id/updateUser', userController.updateUser.bind(userController));
module.exports = router;
