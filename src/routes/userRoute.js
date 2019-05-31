const express = require('express');
const userController = require('../controllers/UserController');
const checkToken = require('../middlewares/appMiddlewares/checkToken');
const checkAccess = require('../middlewares/appMiddlewares/checkAccess');
const { ROLES } = require('../constants');

const router = express.Router();

router.get('/', checkToken, checkAccess(ROLES.admin, ROLES.user), userController.getUsers.bind(userController));

router.get('/:id', userController.getUser.bind(userController));
router.delete('/:id', userController.deleteById.bind(userController));
router.post('/login', userController.login.bind(userController));
router.post('/', userController.addUser.bind(userController));
router.put('/:id', userController.updateById.bind(userController));
router.post(
  '/:id/subscribeOnMeeting',
  userController.subscribeOnMeeting.bind(userController),
);

module.exports = router;
