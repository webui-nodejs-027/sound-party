const express = require('express');
const songController = require('../controllers/SongController');
const { songValidator } = require('../validators/');

const router = express.Router();

router.get('/', songController.getAllData.bind(songController));
router.get('/:id', songController.getById.bind(songController));
router.post(
  '/',
  songValidator.checkBody,
  songController.addSong.bind(songController)
);
router.put('/:id', songController.updateById.bind(songController));
router.delete('/:id', songController.deleteById.bind(songController));

module.exports = router;
