const express = require('express');
const userController = require('../controllers/UserController');
const checkToken = require('../middlewares/appMiddlewares/checkToken');
const checkAccess = require('../middlewares/appMiddlewares/checkAccess');
const errorWrap = require('../middlewares/appMiddlewares/errorWrap');
const { userValidator } = require('../validators');
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
router.post(
  '/',
  userValidator,
  errorWrap(userController.addUser.bind(userController)),
);
router.put('/:id', errorWrap(userController.updateById.bind(userController)));
router.post(
  '/:id/subscribeOnMeeting',
  errorWrap(userController.subscribeOnMeeting.bind(userController)),
);
router.post(
  '/changePassword',
  errorWrap(userController.changePassword.bind(userController)),
);

router.post('/reg/mailcheck', userController.mailCheck.bind(userController));
router.post('/reg/adduser', userController.addUser.bind(userController));
router.post(
  '/reg/sendconfirm',
  userController.sendConfirm.bind(userController),
);
router.get(
  '/reg/userconfirm/:token',
  userController.userConfirm.bind(userController),
);


module.exports = router;
