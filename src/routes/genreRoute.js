const express = require('express');
const genreController = require('../controllers/GenreController');
const { baseValidator, genreValidator } = require('../validators/index.js');
const errorWrap = require('../middlewares/appMiddlewares/errorWrap');

const router = express.Router();

router.use('/:id', baseValidator.checkId);

router.get('/:id', errorWrap(genreController.getById.bind(genreController)));
router.post(
  '/',
  genreValidator.checkBody,
  errorWrap(genreController.insertData.bind(genreController))
);
router.put(
  '/:id',
  errorWrap(genreController.updateById.bind(genreController)),
);
router.delete(
  '/:id',
  errorWrap(genreController.deleteById.bind(genreController))
);

router.get('/', errorWrap(genreController.getAllData.bind(genreController)));

module.exports = router;
