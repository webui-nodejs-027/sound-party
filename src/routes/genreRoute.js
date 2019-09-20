const express = require('express');
const genreController = require('../controllers/GenreController');
const { baseValidator, genreValidator } = require('../validators/index.js');
const errorWrap = require('../middlewares/appMiddlewares/errorWrap');
const checkToken = require('../middlewares/appMiddlewares/checkToken');
const checkAccess = require('../middlewares/appMiddlewares/checkAccess');
const { ROLES } = require('../constants');

const router = express.Router();

router.use('/:id', baseValidator.checkId);

router.get(
  '/:id',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  errorWrap(genreController.getById.bind(genreController)),
);
router.post(
  '/',
  checkToken,
  checkAccess(ROLES.admin),
  genreValidator.checkBody,
  errorWrap(genreController.insertData.bind(genreController)),
);
router.put(
  '/:id',
  checkToken,
  checkAccess(ROLES.admin),
  errorWrap(genreController.updateById.bind(genreController)),
);
router.delete(
  '/:id',
  checkToken,
  checkAccess(ROLES.admin),
  errorWrap(genreController.deleteById.bind(genreController)),
);

router.get(
  '/',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  errorWrap(genreController.getAllData.bind(genreController)),
);

module.exports = router;
