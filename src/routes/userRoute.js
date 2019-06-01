const express = require('express');
const userController = require('../controllers/UserController');
const checkToken = require('../middlewares/appMiddlewares/checkToken');
const checkAccess = require('../middlewares/appMiddlewares/checkAccess');
const errorWrap = require('../middlewares/appMiddlewares/errorWrap');
const { ROLES } = require('../constants');

const router = express.Router();

router.get('/', userController.getUsers.bind(userController));

router.get(
  '/:id',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  errorWrap(userController.getUser.bind(userController)),
);
router.delete(
  '/:id',
  errorWrap(userController.deleteById.bind(userController)),
);
router.post('/login', errorWrap(userController.login.bind(userController)));
router.post('/', errorWrap(userController.addUser.bind(userController)));
router.put('/:id', errorWrap(userController.updateById.bind(userController)));
router.post(
  '/:id/subscribeOnMeeting',
  errorWrap(userController.subscribeOnMeeting.bind(userController)),
);
router.post(
  '/changePassword',
  errorWrap(userController.changePassword.bind(userController)),
);

module.exports = router;
