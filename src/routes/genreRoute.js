const express = require('express');
const GenreController = require('../controllers/GenreController');
const Genre = require('../db/schemas/GenreSchema');

const router = express.Router();

const genreController = new GenreController(Genre);

router.get('/:id', genreController.getDataById.bind(genreController));
router.post('/', genreController.addData.bind(genreController));
router.put('/:id', genreController.updateDataById.bind(genreController));
router.delete('/:id', genreController.deleteDataById.bind(genreController));

router.get('/', genreController.getAllData.bind(genreController));


module.exports = router;
