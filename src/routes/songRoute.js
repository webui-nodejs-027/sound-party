const express = require('express');
const songController = require('../controllers/SongController');
const { songValidator } = require('../validators/');
const fileValidator = require('../middlewares/appMiddlewares/songMiddleware');
const errorWrap = require('../middlewares/appMiddlewares/errorWrap');
const checkToken = require('../middlewares/appMiddlewares/checkToken');
const checkAccess = require('../middlewares/appMiddlewares/checkAccess');
const { ROLES } = require('../constants');

const router = express.Router();

router.get(
  '/',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  errorWrap(songController.getAllData.bind(songController)),
);
router.get(
  '/:id',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  songValidator.checkId,
  errorWrap(songController.getById.bind(songController)),
);
router.post(
  '/',
  checkToken,
  checkAccess(ROLES.admin),
  songValidator.checkBody,
  errorWrap(songController.addSongData.bind(songController)),
);
router.post(
  '/upload-file',
  checkToken,
  checkAccess(ROLES.admin),
  fileValidator.checkBody,
  errorWrap(songController.addSongSrc.bind(songController)),
);
router.put(
  '/:id',
  checkToken,
  checkAccess(ROLES.admin),
  songValidator.checkId,
  songValidator.checkBody,
  errorWrap(songController.updateSongData.bind(songController)),
);
router.put(
  '/:id/upload-file',
  checkToken,
  checkAccess(ROLES.admin),
  songValidator.checkId,
  fileValidator.checkBody,
  errorWrap(songController.updateSongFile.bind(songController)),
);
router.delete(
  '/:id',
  checkToken,
  checkAccess(ROLES.admin),
  songValidator.checkId,
  errorWrap(songController.deleteSong.bind(songController)),
);

module.exports = router;
