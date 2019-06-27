const express = require('express');
const cityController = require('../controllers/CityController');
const { cityValidator, baseValidator } = require('../validators/');
const errorWrap = require('../middlewares/appMiddlewares/errorWrap');

const router = express.Router();

router.use('/:id', baseValidator.checkId);

router.get('/', errorWrap(cityController.getAllData.bind(cityController)));
router.get('/:id', errorWrap(cityController.getById.bind(cityController)));
router.post(
  '/',
  cityValidator.checkBody,
  errorWrap(cityController.insertData.bind(cityController))
);
router.put(
  '/:id',
  cityValidator.checkBody,
  errorWrap(cityController.updateById.bind(cityController))
);
router.delete(
  '/:id',
  errorWrap(cityController.deleteById.bind(cityController))
);

module.exports = router;
