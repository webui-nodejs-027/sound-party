/* eslint-disable max-len */
const express = require('express');
const userController = require('../controllers/UserController');
const checkToken = require('../middlewares/appMiddlewares/checkToken');
const checkAccess = require('../middlewares/appMiddlewares/checkAccess');
const errorWrap = require('../middlewares/appMiddlewares/errorWrap');
const { userValidator } = require('../validators');
const { ROLES } = require('../constants');

const router = express.Router();

router.get('/', errorWrap(userController.getUsers.bind(userController)));
router.get(
  '/getUsersPercent',
  checkToken,
  errorWrap(userController.getUsersPercent.bind(userController)),
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
/**
 * @api {put} /users/:id Update playlist by id
 * @apiVersion 0.0.0
 * @apiName UpdateData
 * @apiGroup User
 * @apiExample Example usage:
 *
 *     body:
 *     {
        "firstName": "Aleksandr",
        "lastName": "Snow",
        "email": "aleksandr.snow10@gmail.com",
        "birthday": "1995-03-26",
        "gender": "male",
        "socialLink": "https://www.instagram.com/aleksandr_snow",
        "roleId": 1
    }
 *
 * @apiParam {Number} id Identifier of  user.
 * @apiParam {String} firstname Firstname of user.
 * @apiParam {String} lastname Lastname of user.
 * @apiParam {String} email  E-main of user.
 * @apiParam {String} birthday of user.
 * @apiParam {String} gender  Gender of user.
 * @apiParam {String} socialLink  Link to social network of user.
 * @apiParam {Number} roleId  Identifier of role which user has.
 *
 * @apiSuccess {Number} id Identifier of  user.
 * @apiSuccess {String} firstname Firstname of user.
 * @apiSuccess {String} lastname Lastname of user.
 * @apiSuccess {String} email  E-main of user.
 * @apiSuccess {String} birthday of user.
 * @apiSuccess {String} gender  Gender of user.
 * @apiSuccess {String} socialLink  Link to social network of user.
 * @apiSuccess {Number} roleId  Identifier of role which user has.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "firstName": "Aleksandr",
    "lastName": "Snow",
    "email": "aleksandr.snow10@gmail.com",
    "birthday": "1995-03-26",
    "gender": "male",
    "socialLink": "https://www.instagram.com/aleksandr_snow",
    "roleId": 1,
    "id": 11
}
 * @apiError ValidationFailed
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
    "message": "Validation failed",
    "errors": [
        {
            "location": "body",
            "param": "email",
            "value": 7,
            "msg": "Invalid value"
        }
    ]
}
 */

router.put('/:id', errorWrap(userController.updateById.bind(userController)));
router.post(
  '/:id/subscribeOnMeeting',
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
