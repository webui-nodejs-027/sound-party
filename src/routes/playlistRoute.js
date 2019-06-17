const express = require('express');
const playlistController = require('../controllers/PlaylistController');
const validator = require('../validators/playlistValidator');
const baseValidator = require('../validators/baseValidator');
const errorWrap = require('../middlewares/appMiddlewares/errorWrap');
const checkToken = require('../middlewares/appMiddlewares/checkToken');
const checkAccess = require('../middlewares/appMiddlewares/checkAccess');
const { ROLES } = require('../constants');

const router = express.Router();

router.use('/:id', baseValidator.checkId);
router.use('/:userId', validator.checkUserId);
router.use('/:songId', validator.checkSongId);
/**
 * @api {get}  /playlists Request info about all playlists
 * @apiName GetAllData
 * @apiGroup Playlist
 *
 * @apiSuccess {Number} id Identifier of the playlist.
 * @apiSuccess {String} name Name of the playlist.
 * @apiSuccess {Boolean} favourite  Is playlist favourite or not.
 * @apiSuccess {Boolean} isMain  Is playlist main or not.
 * @apiSuccess {Number} userId  Identifier of user who has this playlist.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * [
 *     {
 *      "id": 1,
        "name": "Aleksandr`s playlist",
        "favourite": true,
        "isMain": false,
        "userId": 1
 *     },
 {
 *      "id": 2,
        "name": "Aleksandr`s playlist",
        "favourite": true,
        "isMain": false,
        "userId": 1
 *     }
]
 */

router.get(
  '/',
  errorWrap(playlistController.getAllData.bind(playlistController)),
);

/**
 * @api {get} /playlists/:userId Get all playlists by user id
 * @apiVersion 0.0.0
 * @apiName GetDataByUserId
 * @apiGroup Playlist
 * @apiParam {Number} userId Identifier of user.
 *
 *
 * @apiSuccess {Number} id Identifier of the playlist.
 * @apiSuccess {String} name Name of the playlist.
 * @apiSuccess {Boolean} favourite  Is playlist favourite or not.
 * @apiSuccess {Boolean} isMain  Is playlist main or not.
 * @apiSuccess {Number} userId  Identifier of user who has this playlist.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  [
    {
        "id": 1,
        "name": "Aleksandr`s playlist",
        "favourite": true,
        "isMain": false,
        "userId": 1
    },
    {
        "id": 2,
        "name": "Aleksandr`s playlist",
        "favourite": false,
        "isMain": true,
        "userId": 1
    },
    {
        "id": 22,
        "name": "Peter's playlist",
        "favourite": true,
        "isMain": false,
        "userId": 1
    }
]
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
            "param": "userId",
            "value": "hi",
            "msg": "Invalid value"
        }
    ]
}
 */

router.get(
  '/:userId',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  errorWrap(playlistController.getAllDataByUserId.bind(playlistController)),
);
/**
 * @api {get}  /playlists/:id/users/:userId Request info about one playlist for user
 * @apiName GetDataByPlaylistIdAndUserId
 * @apiGroup Playlist
 * @apiParam {Number} id Identifier of playlist.
 * @apiParam {Number} userId Identifier of user.
 *
 *
 * @apiSuccess {Number} id Identifier of the playlist.
 * @apiSuccess {String} name Name of the playlist.
 * @apiSuccess {Boolean} favourite  Is playlist favourite or not.
 * @apiSuccess {Boolean} isMain  Is playlist main or not.
 * @apiSuccess {Number} userId  Identifier of user who has this playlist.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "id": 1,
        "name": "Aleksandr`s playlist",
        "favourite": true,
        "isMain": false,
        "userId": 1
 *     }
@apiError ValidationFailed
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
  '/:id/users/:userId',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  playlistController.getByIdUserAndIdPlaylist.bind(playlistController),
);

/**
 * @api {delete} /playlists/:id Delete playlist by id
 * @apiVersion 0.0.0
 * @apiName DeleteData
 * @apiGroup Playlist
 * @apiParam {Number} id Identifier of the playlist.
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
  errorWrap(playlistController.deleteById.bind(playlistController)),
);

/**
 * @api {post} /playlists Create new playlist
 * @apiVersion 0.0.0
 * @apiName CreateData
 * @apiGroup Playlist
 * @apiExample Example usage:
 *
 *     body:
 *     {
 *       "name": "Peter's playlist",
 *       "favourite": true,
 *       "isMain": false,
 *        "userId": 1
 *     }
 *
 * @apiParam {String} name Playlist's Name.
 * @apiParam {Boolean} favourite Favourite playlist or not
 * @apiParam {Boolean} isMain Main playlist or not
 * @apiParam {Number} userId Identifier of user who has this playlist.
 *
 * @apiSuccess {Number} id Identifier of the playlist.
 * @apiSuccess {String} name Name of the playlist.
 * @apiSuccess {Boolean} favourite  Is playlist favourite or not.
 * @apiSuccess {Boolean} isMain  Is playlist main or not.
 * @apiSuccess {Number} userId  Identifier of user who has this playlist.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *  "name": "Peter's playlist",
    "favourite": true,
    "isMain": false,
    "userId": 1,
    "id": 22
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
            "param": "userId",
            "value": true,
            "msg": "Invalid value"
        }
    ]
}
 */

router.post(
  '/',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  validator.checkBody,
  errorWrap(playlistController.insertData.bind(playlistController)),
);
/**
 * @api {post}  /playlists/:id/addsong/:songId Add song to playlist
 * @apiName AddSongToPlaylist
 * @apiGroup Playlist
 * @apiParam {Number} id Identifier of playlist.
 * @apiParam {Number} songId Identifier of song.
 *
 *
 * @apiSuccess {Number} id Identifier of the playlist.
 * @apiSuccess {String} name Name of the playlist.
 * @apiSuccess {Boolean} favourite  Is playlist favourite or not.
 * @apiSuccess {Boolean} isMain  Is playlist main or not.
 * @apiSuccess {Number} userId  Identifier of user who has this playlist.
 * @apiSuccess {Object[]} songs Songs in the playlist
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
    {
        "id": 22,
        "name": "Peter's playlist",
        "favourite": true,
        "isMain": false,
        "userId": 1,
        "songs": [
            {
                "id": 5,
                "name": "Song4",
                "source": "file://localhost/d:/storage/song4.mp3",
                "year": 1992,
                "authorId": 3,
                "genreId": 2
            }
        ]
    }
]
@apiError ValidationFailed
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

@apiError  AlreadyExists
*
* @apiErrorExample Error-Response:
HTTP/1.1 400 Bad Request
 *     {
    "errors": "Song 1 already exists in playlist 4"
}
 */

router.post(
  '/:id/addsong/:songId',
  errorWrap(playlistController.addSongToPlaylist.bind(playlistController)),
);
/**
 * @api {post}  /playlists/:id/removesong/:songId Removesong from playlist
 * @apiName RemoveSongFromPlaylist
 * @apiGroup Playlist
 * @apiParam {Number} id Identifier of playlist.
 * @apiParam {Number} songId Identifier of song.
 *
 *
 * @apiSuccess {Number} id Identifier of the playlist.
 * @apiSuccess {String} name Name of the playlist.
 * @apiSuccess {Boolean} favourite  Is playlist favourite or not.
 * @apiSuccess {Boolean} isMain  Is playlist main or not.
 * @apiSuccess {Number} userId  Identifier of user who has this playlist.
 * @apiSuccess {Object[]} songs Songs in the playlist
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
    {
        "id": 22,
        "name": "Peter's playlist",
        "favourite": true,
        "isMain": false,
        "userId": 1,
        "songs": []
    }
]
@apiError ValidationFailed
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

@apiError  Doesn'tExist
*
* @apiErrorExample Error-Response:
HTTP/1.1 400 Bad Request
 *    {
    "errors": "Song 5 does not exist in playlist 22"
}
 */

router.post(
  '/:id/removesong/:songId',
  errorWrap(playlistController.removeSongFromPlaylist.bind(playlistController)),
);
/**
 * @api {put} /playlists/:id Update playlist by id
 * @apiVersion 0.0.0
 * @apiName UpdateData
 * @apiGroup Playlist
 * @apiExample Example usage:
 *
 *     body:
 *     {
 *       "name": "Peter's playlist",
 *       "favourite": true
 *     }
 * @apiParam {Number} id Identifier of the playlist.
 * @apiParam {String} name Playlist's Name.
 * @apiParam {Boolean} favourite Favourite playlist or not.
 *
 *
 * @apiSuccess {Number} id Identifier of the playlist.
 * @apiSuccess {String} name Name of the playlist.
 * @apiSuccess {Boolean} favourite  Is playlist favourite or not.
 * @apiSuccess {Boolean} isMain  Is playlist main or not.
 * @apiSuccess {Number} userId  Identifier of user who has this playlist.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  "id": 23,
    "name": "my playlist",
    "favourite": true,
    "isMain": false,
    "userId": 3
 *
 * @apiError ValidationFailed
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
    "message": "Validation failed",
    "errors": [
        {
            "location": "body",
            "param": "favourite",
            "value": 7,
            "msg": "Invalid value"
        }
    ]
}
 */
router.put(
  '/:id',
  errorWrap(playlistController.updateById.bind(playlistController)),
);
module.exports = router;
