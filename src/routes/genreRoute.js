const express = require('express');
const genreController = require('../controllers/GenreController');

const router = express.Router();

router.get('/:id', genreController.getById.bind(genreController));
router.post('/', genreController.insertData.bind(genreController));
router.put('/:id', genreController.updateById.bind(genreController));
router.delete('/:id', genreController.deleteById.bind(genreController));

router.get('/', genreController.getAllData.bind(genreController));


module.exports = router;
