const express = require('express');
const statusController = require('../controllers/StatusController');
const { checkId } = require('../validators/baseValidator');
const errorWrap = require('../middlewares/appMiddlewares/errorWrap');

const router = express.Router();

router.use('/:id', checkId);

/**
 * @api {get} /statuses/:id Get status by id
 * @apiVersion 0.0.0
 * @apiName GetDataById
 * @apiGroup Status
 * @apiParam {Number} id Identifier of status.
 *
 * @apiSuccess {Number} id Identifier of  status.
 * @apiSuccess {String} name Name of status.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "id": 2,
    "name": "pending"
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

router.get('/:id', errorWrap(statusController.getById.bind(statusController)));

/**
 * @api {post} /statuses Create new status
 * @apiVersion 0.0.0
 * @apiName CreateData
 * @apiGroup Status
 * @apiExample Example usage:
 *
 *     body:
 *      {
    "name": "removed",
        }
 *
 * @apiSuccess {String} name Name of status.
 * @apiSuccess {Number} id Id of status.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 CREATED
 *  {
    "name": "removed",
    "id": 4
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
            "param": "name",
            "value": "",
            "msg": "Invalid value"
        }
    ]
}
 */

router.post('/', errorWrap(statusController.insertData.bind(statusController)));

/**
 * @api {put} /statuses/:id Update status by id
 * @apiVersion 0.0.0
 * @apiName UpdateData
 * @apiGroup Status
 * @apiParam {Number} id Id identifier of status
 * @apiExample Example usage:
 *
 *     body:
 *     {
"name": "fin"
}
 *
 * @apiSuccess {Number} id Identifier of  status.
 * @apiSuccess {String} name Name of status.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "id": 2,
    "name": "fin"
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
            "param": "genreId",
            "value": bla,
            "msg": "Invalid value"
        }
    ]
}
 */

router.put(
  '/:id',
  errorWrap(statusController.updateById.bind(statusController))
);

/**
 * @api {delete} /statuses/:id Delete status by id
 * @apiVersion 0.0.0
 * @apiName DeleteData
 * @apiGroup Status
 * @apiParam {Number} id Identifier of status.
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
  errorWrap(statusController.deleteById.bind(statusController))
);

/**
 * @api {get}  /statuses Request info about all statuses
 * @apiName GetAllData
 * @apiGroup Status
 *
 * @apiSuccess {Number} page Page number.
 * @apiSuccess {Number} limit Number of elements per page.
 * @apiSuccess {Number} total Total count of statuses.
 * @apiSuccess {Object[]} data  Array of statuses.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "page": 1,
    "limit": 10,
    "total": 4,
    "data": [
        {
            "id": 1,
            "name": "finished"
        },
        {
            "id": 2,
            "name": "pending"
        },
        {
            "id": 3,
            "name": "cancelled"
        }
    ]
}
 */

router.get('/', statusController.getAllData.bind(statusController));

module.exports = router;
