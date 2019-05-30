const express = require('express');
const userController = require('../controllers/UserController');
const checkToken = require('../middlewares/appMiddlewares/checkToken');

const router = express.Router();

router.get('/', userController.getUsers.bind(userController));

router.get('/:id', checkToken, userController.getUser.bind(userController));
router.delete('/:id', userController.deleteById.bind(userController));
router.post('/login', userController.login.bind(userController));
router.post('/', userController.addUser.bind(userController));
router.put('/:id', userController.updateById.bind(userController));

module.exports = router;
