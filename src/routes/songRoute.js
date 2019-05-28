const express = require('express');
const songController = require('../controllers/SongController');

const router = express.Router();

router.get('/', songController.getAllData.bind(songController));
router.get('/:id', songController.getById.bind(songController));
router.post('/', songController.insertData.bind(songController));
router.put('/:id', songController.updateById.bind(songController));
router.delete('/:id', songController.deleteById.bind(songController));

module.exports = router;
