const express = require('express');
const authorController = require('../controllers/AuthorController');
const { baseValidator, authorValidator } = require('../validators/index.js');
const errorWrap = require('../middlewares/appMiddlewares/errorWrap');
const checkToken = require('../middlewares/appMiddlewares/checkToken');
const checkAccess = require('../middlewares/appMiddlewares/checkAccess');
const { ROLES } = require('../constants');

const router = express.Router();

router.all('/:id', baseValidator.checkId);

router.get(
  '/:id',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  errorWrap(authorController.getById.bind(authorController)),
);
router.post(
  '/',
  checkToken,
  checkAccess(ROLES.admin),
  authorValidator.checkBody,
  errorWrap(authorController.insertData.bind(authorController)),
);
router.put(
  '/:id',
  checkToken,
  checkAccess(ROLES.admin),
  authorValidator.checkBody,
  errorWrap(authorController.updateById.bind(authorController)),
);
router.delete(
  '/:id',
  checkToken,
  checkAccess(ROLES.admin),
  errorWrap(authorController.deleteById.bind(authorController)),
);

router.get(
  '/',
  checkToken,
  checkAccess(ROLES.admin, ROLES.user),
  errorWrap(authorController.getAllData.bind(authorController)),
);

module.exports = router;
