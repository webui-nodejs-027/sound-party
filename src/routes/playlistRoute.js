const express = require('express');
const playlistController = require('../controllers/PlaylistController');
const validator = require('../validators/playlistValidator');
const baseValidator = require('../validators/baseValidator');

const router = express.Router();

router.use('/:id', baseValidator.checkId);
router.use('/:userId', validator.checkUserId);

router.get('/', playlistController.getAllData.bind(playlistController));
router.get(
  '/users/:userId',
  playlistController.getAllDataByIdUser.bind(playlistController),
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
router.put(
  '/:id',
  validator.checkBodyForPut,
  playlistController.updateById.bind(playlistController),
);
module.exports = router;
