const express = require('express');
const playlistController = require('../controllers/PlaylistController');
const validator = require('../validators/playlistValidator');
const baseValidator = require('../validators/baseValidator');
const errorWrap = require('../middlewares/appMiddlewares/errorWrap');

const router = express.Router();

router.use('/:id', baseValidator.checkId);
router.use('/:userId', validator.checkUserId);
router.use('/:songId', validator.checkSongId);

router.get('/', errorWrap(playlistController.getAllData.bind(playlistController)));
router.get(
  '/:userId',
  errorWrap(playlistController.getAllDataByUserId.bind(playlistController)),
);
router.get(
  '/:id/users/:userId',
  playlistController.getByIdUserAndIdPlaylist.bind(playlistController),
);
router.delete('/:id', errorWrap(playlistController.deleteById.bind(playlistController)));
router.post(
  '/',
  validator.checkBody,
  errorWrap(playlistController.insertData.bind(playlistController)),
);
router.post(
  '/:id/addsong/:songId',
  errorWrap(playlistController.addSongToPlaylist.bind(playlistController)),
);
router.post(
  '/:id/removesong/:songId',
  errorWrap(playlistController.removeSongFromPlaylist.bind(playlistController)),
);
router.put(
  '/:id',
  validator.checkBodyForPut,
  errorWrap(playlistController.updateById.bind(playlistController)),
);
module.exports = router;
