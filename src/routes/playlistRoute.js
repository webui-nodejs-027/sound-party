const express = require('express');
const playlistController = require('../controllers/PlaylistController');

const router = express.Router();

router.get(
  '/users/:userId',
  playlistController.getAllDataByIdUser.bind(playlistController),
);
router.get(
  '/:id/users/:userId',
  playlistController.getByIdUserAndIdPlaylist.bind(playlistController),
);
router.delete('/:id', playlistController.deleteById.bind(playlistController));
router.post('/', playlistController.createPlaylist.bind(playlistController));
router.put('/:id', playlistController.updatePlaylist.bind(playlistController));
module.exports = router;
