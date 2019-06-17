const express = require('express');
const authorController = require('../controllers/AuthorController');
const { baseValidator, authorValidator } = require('../validators/index.js');
const errorWrap = require('../middlewares/appMiddlewares/errorWrap');

const router = express.Router();

router.all('/:id', errorWrap(baseValidator.checkId));

/**
 * @api {delete} /authors/:id Delete Author by id
 * @apiVersion 0.0.0
 * @apiName GetDataById
 * @apiGroup Author
 * @apiParam {Number} id Identifier of author.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *  "id" : 1,
 *  "name": "Peter's playlist",
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
router.get('/:id', errorWrap(authorController.getById.bind(authorController)));

/**
 * @api {post} /authors Create new author
 * @apiVersion 0.0.0
 * @apiName CreateData
 * @apiGroup Author
 * @apiExample Example usage:
 *
 *     body:
 *     {
 *       "name": "Vadyam Coolovich",
 *     }
 *
 * @apiParam {String} name Author Name.
 *
 * @apiSuccess {Number} id Identifier of the author.
 * @apiSuccess {String} name Name of the author.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *  "name": "Vadyam Coolovich",
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
            // "param": "name",
            "value": true,
            "msg": "Invalid value"
        }
    ]
}
 */
router.post(
  '/',
  authorValidator.checkBody,
  errorWrap(
    authorController.insertData.bind(authorController),
  ),
);
router.put(
  '/:id',
  errorWrap(authorController.updateById.bind(authorController)),
);
/**
 * @api {delete} /authors/:id Delete Author by id
 * @apiVersion 0.0.0
 * @apiName DeleteData
 * @apiGroup Author
 * @apiParam {Number} id Identifier of author.
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
  errorWrap(authorController.deleteById.bind(authorController)),
);

/**
 * @api {get}  /authors Request info about all authors
 * @apiName GetAllData
 * @apiGroup Author
 *
 * @apiSuccess {Number} id Identifier of the Author.
 * @apiSuccess {String} name Name of the Author.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * [
 *     {
 *      "id": 1,
        "name": "David Bowie",
 *     },
 {
 *      "id": 2,
        "name": "Aleksandr Vasiliev",
 *     },
       {
        "id": 3,
        "name": "Kurt Cobain"
       }
]
 */
router.get('/', errorWrap(authorController.getAllData.bind(authorController)));

module.exports = router;
