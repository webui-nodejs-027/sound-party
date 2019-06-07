/* eslint-disable max-len */
const express = require('express');
const userController = require('../controllers/UserController');
const checkToken = require('../middlewares/appMiddlewares/checkToken');
const checkAccess = require('../middlewares/appMiddlewares/checkAccess');
const errorWrap = require('../middlewares/appMiddlewares/errorWrap');
const { userValidator } = require('../validators');
const { ROLES } = require('../constants');

const router = express.Router();

/**
 * @api {get}  /users Request info about all users
 * @apiName GetAllData
 * @apiGroup User
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
 * [
    {
        "id": 1,
        "firstName": "Aleksandr",
        "lastName": "Snow",
        "email": "aleksandr.snow0@gmail.com",
        "birthday": "1995-03-26",
        "gender": "male",
        "socialLink": "https://www.instagram.com/aleksandr_snow",
        "roleId": 1
    },
    {
        "id": 2,
        "firstName": "Anna",
        "lastName": "Doe",
        "email": "anna.doe1@gmail.com",
        "birthday": "1995-03-25",
        "gender": "female",
        "socialLink": "https://www.instagram.com/anna_doe",
        "roleId": 2
    }
  ]

 */

router.get('/', userController.getUsers.bind(userController));
/**
 * @api {get} /users/:id Get user by id
 * @apiVersion 0.0.0
 * @apiName GetDataById
 * @apiGroup User
 * @apiParam {Number} id Identifier of user.
 *
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
        "id": 2,
        "firstName": "Anna",
        "lastName": "Doe",
        "email": "anna.doe1@gmail.com",
        "birthday": "1995-03-25",
        "gender": "female",
        "socialLink": "https://www.instagram.com/anna_doe",
        "roleId": 2
    }
 *
 * @apiError ValidationFailed
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
    "message": "Validation failed",
    "errors": [
        {
            "location": "params",
            "param": "id",
            "value": "hi",
            "msg": "Invalid value"
        }
    ]
}
 */
router.get(
  '/:id',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  errorWrap(userController.getUser.bind(userController)),
);
/**
 * @api {delete} /users/:id Delete user by id
 * @apiVersion 0.0.0
 * @apiName DeleteData
 * @apiGroup User
 * @apiParam {Number} id Identifier of user.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   1
 * @apiError ValidationFailed
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
    "message": "Validation failed",
    "errors": [
        {
            "location": "params",
            "param": "id",
            "value": "hi",
            "msg": "Invalid value"
        }
    ]
}
 */
router.delete(
  '/:id',
  errorWrap(userController.deleteById.bind(userController)),
);
/**
 * @api {post} /users/login Log in to app
 * @apiVersion 0.0.0
 * @apiName CreateData
 * @apiGroup User
 * @apiExample Example usage:
 *
 *     body:
 *     {
        "email": "aleksandr.snow10@gmail.com",
        "password":"H3Phtyroe67FO890"
    }
 *
 * @apiParam {String} email  E-main of user.
 * @apiParam {String} password Password of user
 *
 * @apiSuccess {Boolean} success  is it done or not.
 * @apiSuccess {String} message  result of authentication.
 * @apiSuccess {String} token  token.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "succes": true,
    "message": "Authentication succesful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGVJZCI6MSwiaWF0IjoxNTU5ODE2MDMzLCJleHAiOjE1NTk5MDI0MzN9.4e9JBRxIlxxTeq68ZanYZ32RYmI8fBbQ9lpMRNdOpc0"
}
 *
 * @apiError ValidationFailed
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
    "message": "Validation Failed",
    "errors": [
        {
            "location": "body",
            "param": "email",
            "value": true,
            "msg": "Invalid value"
        }
    ]
}
 @apiError DoesntFound
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     User doesnt found

 */
router.post('/login', errorWrap(userController.login.bind(userController)));


/**
 * @api {post} /users Create new user
 * @apiVersion 0.0.0
 * @apiName CreateData
 * @apiGroup User
 * @apiExample Example usage:
 *
 *     body:
 *     {
        "firstName": "Aleksandr",
        "lastName": "Snow",
        "email": "aleksandr.snow10@gmail.com",
        "password":"H3Phtyroe67FO890",
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
 * @apiParam {String} password Password of user
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
 *
 * @apiError ValidationFailed
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
    "message": "Validation Failed",
    "errors": [
        {
            "location": "body",
            "param": "email",
            "value": true,
            "msg": "Invalid value"
        }
    ]
}
 */
router.post(
  '/',
  userValidator,
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


router.post(
  '/',
  userValidator.checkWholeBody,
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
router.post(
  '/reg/adduser',
  errorWrap(userController.addUser.bind(userController)),
);
router.get(
  '/passwordreset/:token',
  errorWrap(userController.passwordReset.bind(userController)),
);
router.post(
  '/passwordreset',
  userValidator.checkEmail,
  userController.sendTokenForReset.bind(userController),
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
