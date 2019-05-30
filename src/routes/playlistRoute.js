const express = require('express');
const playlistController = require('../controllers/PlaylistController');
const validator = require('../validators/playlistValidator');
const baseValidator = require('../validators/baseValidator');

const router = express.Router();

router.use('/:id', baseValidator.checkId);
router.use('/:userId', validator.checkUserId);
router.get(
  '/:userId',
  playlistController.getAllDataByUserId.bind(playlistController),
);
router.get(
  '/:id/users/:userId',
  playlistController.getByIdUserAndIdPlaylist.bind(playlistController),
);
router.delete('/:id', playlistController.deleteById.bind(playlistController));
router.post(
  '/',
  validator.checkBody,
  playlistController.insertData.bind(playlistController),
);
// router.post(
//   '/:id/addsong/:songId',
//   playlistController.addSongToPlaylist.bind(playlistController),
// );
router.put(
  '/:id',
  validator.checkBodyForPut,
  playlistController.updateById.bind(playlistController),
);
module.exports = router;
