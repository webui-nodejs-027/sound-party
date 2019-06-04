const express = require('express');
const songController = require('../controllers/SongController');
const { songValidator } = require('../validators/');
const fileValidator = require('../middlewares/appMiddlewares/songMiddleware');
const errorWrap = require('../middlewares/appMiddlewares/errorWrap');

const router = express.Router();

router.get('/', errorWrap(songController.getAllData.bind(songController)));
router.get(
  '/:id',
  songValidator.checkId,
  errorWrap(songController.getById.bind(songController)),
);
router.post(
  '/',
  songValidator.checkBody,
  errorWrap(songController.addSongData.bind(songController)),
);
router.post(
  '/upload-file',
  fileValidator.checkBody,
  errorWrap(songController.addSongSrc.bind(songController)),
);
router.put(
  '/:id',
  songValidator.checkId,
  songValidator.checkBody,
  errorWrap(songController.updateSongData.bind(songController)),
);
router.put(
  '/:id/upload-file',
  songValidator.checkId,
  fileValidator.checkBody,
  errorWrap(songController.updateSongFile.bind(songController)),
);
router.delete(
  '/:id',
  songValidator.checkId,
  errorWrap(songController.deleteSong.bind(songController)),
);

module.exports = router;
