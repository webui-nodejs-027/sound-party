const express = require('express');
const cityController = require('../controllers/CityController');
const { cityValidator, baseValidator } = require('../validators/');
const errorWrap = require('../middlewares/appMiddlewares/errorWrap');
const checkToken = require('../middlewares/appMiddlewares/checkToken');
const checkAccess = require('../middlewares/appMiddlewares/checkAccess');
const { ROLES } = require('../constants');

const router = express.Router();

router.use('/:id', baseValidator.checkId);

router.get(
  '/',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  errorWrap(cityController.getAllData.bind(cityController)),
);
router.get(
  '/:id',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  errorWrap(cityController.getById.bind(cityController)),
);
router.post(
  '/',
  checkToken,
  checkAccess(ROLES.admin),
  cityValidator.checkBody,
  errorWrap(cityController.insertData.bind(cityController)),
);
router.put(
  '/:id',
  checkToken,
  checkAccess(ROLES.admin),
  cityValidator.checkBody,
  errorWrap(cityController.updateById.bind(cityController)),
);
router.delete(
  '/:id',
  checkToken,
  checkAccess(ROLES.admin),
  errorWrap(cityController.deleteById.bind(cityController)),
);

module.exports = router;
