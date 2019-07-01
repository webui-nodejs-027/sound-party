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

// router.get(
//   '/',
//   errorWrap(playlistController.getAllData.bind(playlistController)),
// );

router.get(
  '/',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  errorWrap(playlistController.getAllDataByUserId.bind(playlistController)),
);

router.get(
  '/:id/users/:userId',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  playlistController.getByIdUserAndIdPlaylist.bind(playlistController),
);

router.delete(
  '/:id',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  errorWrap(playlistController.deleteById.bind(playlistController)),
);

router.post(
  '/',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  validator.checkBody,
  errorWrap(playlistController.insertData.bind(playlistController)),
);

router.post(
  '/:id/addsong/:songId',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  errorWrap(playlistController.addSongToPlaylist.bind(playlistController)),
);

router.post(
  '/:id/removesong/:songId',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  errorWrap(playlistController.removeSongFromPlaylist.bind(playlistController)),
);

router.put(
  '/:id',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  errorWrap(playlistController.updateById.bind(playlistController)),
);
router.get(
  '/:id/songs',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  errorWrap(playlistController.getAllSongsFromPlaylist.bind(playlistController)),
);
module.exports = router;
