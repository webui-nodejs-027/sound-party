const express = require('express');
const userController = require('../controllers/UserController');
const checkToken = require('../middlewares/appMiddlewares/checkToken');
const validator = require('../validators/userValidator');

const router = express.Router();

router.get('/', userController.getUsers.bind(userController));

router.get('/:id', checkToken, userController.getUser.bind(userController));
router.get('/passwordreset/:token', userController.passwordReset.bind(userController));
router.delete('/:id', userController.deleteById.bind(userController));
router.post('/login', userController.login.bind(userController));
router.post('/passwordreset',
  validator.checkEmail,
  userController.sendTokenForReset.bind(userController));
router.post('/reg/mailcheck',
  validator.checkEmail,
  userController.mailCheck.bind(userController));
router.post('/reg/adduser',
  validator.checkWholeBody,
  userController.addUser.bind(userController));
router.post(
  '/reg/sendconfirm',
  validator.checkBodyId,
  userController.sendConfirm.bind(userController),
);
router.get(
  '/reg/userconfirm/:token',
  userController.userConfirm.bind(userController),
);
router.put('/:id', userController.updateById.bind(userController));
router.post(
  '/:id/subscribeOnMeeting',
  userController.subscribeOnMeeting.bind(userController),
);

module.exports = router;
