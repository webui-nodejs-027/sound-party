const express = require('express');
const playlistController = require('../controllers/PlaylistController');
const validator = require('../validators/playlistValidator');
const baseValidator = require('../validators/baseValidator');
const errorWrap = require('../middlewares/appMiddlewares/errorWrap');

const router = express.Router();

router.use('/:id', baseValidator.checkId);
router.use('/:userId', validator.checkUserId);
router.use('/:songId', validator.checkSongId);

router.get(
  '/',
  errorWrap(playlistController.getAllData.bind(playlistController)),
);

router.get(
  '/:userId',
  errorWrap(playlistController.getAllDataByUserId.bind(playlistController)),
);

router.get(
  '/:id/users/:userId',
  playlistController.getByIdUserAndIdPlaylist.bind(playlistController),
);

router.delete(
  '/:id',
  errorWrap(playlistController.deleteById.bind(playlistController)),
);

router.post(
  '/',
  validator.checkBody,
  errorWrap(playlistController.insertData.bind(playlistController)),
);

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
  validator.checkBodyForPut,
  errorWrap(playlistController.updateById.bind(playlistController)),
);
module.exports = router;
