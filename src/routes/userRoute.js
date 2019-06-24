/* eslint-disable max-len */
const express = require('express');
const userController = require('../controllers/UserController');
const checkToken = require('../middlewares/appMiddlewares/checkToken');
const checkAccess = require('../middlewares/appMiddlewares/checkAccess');
const errorWrap = require('../middlewares/appMiddlewares/errorWrap');
const { userValidator, baseValidator } = require('../validators');
const { ROLES } = require('../constants');

const router = express.Router();

router.get('/', errorWrap(userController.getUsers.bind(userController)));
router.get(
  '/getUsersPercent',
  checkToken,
  errorWrap(userController.getUsersPercent.bind(userController)),
);

router.delete(
  '/:id',
  baseValidator.checkId,
  errorWrap(userController.deleteById.bind(userController)),
);

router.get(
  '/getUsersMusicStats',
  checkToken,
  errorWrap(userController.getUserMusicStats.bind(userController)),
);

router.get(
  '/checkAuthorization',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  userController.checkAuthorization.bind(userController),
);

router.get(
  '/:id',
  baseValidator.checkId,
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  errorWrap(userController.getUser.bind(userController)),
);
router.post('/login', errorWrap(userController.login.bind(userController)));

router.post(
  '/',
  userValidator.checkWholeBody,
  errorWrap(userController.addUser.bind(userController)),
);

router.put(
  '/:id',
  userValidator.checkWholeBody,
  baseValidator.checkId,
  errorWrap(userController.updateById.bind(userController)),
);

router.post(
  '/:id/subscribeOnMeeting',
  userValidator.checkBodyMeetingId,
  errorWrap(userController.subscribeOnMeeting.bind(userController)),
);
router.post(
  '/changePassword',
  errorWrap(userController.changePassword.bind(userController)),
);
router.get(
  '/passwordreset/:token',
  errorWrap(userController.passwordReset.bind(userController)),
);
router.post(
  '/passwordreset',
  userValidator.checkEmail,
  errorWrap(userController.sendTokenForReset.bind(userController)),
);
router.post(
  '/reg/mailcheck',
  userValidator.checkEmailAndPassword,
  errorWrap(userController.mailCheck.bind(userController)),
);
router.post(
  '/reg/adduser',
  userValidator.checkWholeBody,
  errorWrap(userController.addUser.bind(userController)),
);
router.post(
  '/reg/sendconfirm',
  userValidator.checkBodyId,
  errorWrap(userController.sendConfirm.bind(userController)),
);
router.get(
  '/reg/userconfirm/:token',
  errorWrap(userController.userConfirm.bind(userController)),
);

module.exports = router;
