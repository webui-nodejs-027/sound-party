const express = require('express');
const GenreController = require('../controllers/GenreController');
const Genre = require('../db/schemas/GenreSchema');

const router = express.Router();

const genreController = new GenreController(Genre);

router.get('/:id', genreController.getById.bind(genreController));
router.post('/', genreController.insertData.bind(genreController));
router.put('/:id', genreController.updateById.bind(genreController));
router.delete('/:id', genreController.deleteById.bind(genreController));

router.get('/', genreController.getAllData.bind(genreController));


module.exports = router;
