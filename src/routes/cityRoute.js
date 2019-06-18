const express = require('express');
const cityController = require('../controllers/CityController');
const { cityValidator } = require('../validators/');
const errorWrap = require('../middlewares/appMiddlewares/errorWrap');

const router = express.Router();

router.get('/', errorWrap(cityController.getAllData.bind(cityController)));
router.get(
  '/:id',
  cityValidator.checkId,
  errorWrap(cityController.getById.bind(cityController))
);
router.post(
  '/',
  cityValidator.checkBody,
  errorWrap(cityController.insertData.bind(cityController))
);
router.put(
  '/:id',
  cityValidator.checkId,
  cityValidator.checkBody,
  errorWrap(cityController.updateById.bind(cityController))
);
router.delete(
  '/:id',
  cityValidator.checkId,
  errorWrap(cityController.deleteById.bind(cityController))
);

module.exports = router;
