const express = require('express');
const roleController = require('../controllers/RoleController');
const checkToken = require('../middlewares/appMiddlewares/checkToken');
const checkAccess = require('../middlewares/appMiddlewares/checkAccess');
const { ROLES } = require('../constants');

const router = express.Router();

router.get(
  '/:id',
  checkToken,
  checkAccess(ROLES.admin),
  roleController.getById.bind(roleController),
);
router.post(
  '/',
  checkToken,
  checkAccess(ROLES.admin),
  roleController.insertData.bind(roleController),
);
router.put(
  '/:id',
  checkToken,
  checkAccess(ROLES.admin),
  roleController.updateById.bind(roleController),
);
router.delete(
  '/:id',
  checkToken,
  checkAccess(ROLES.admin),
  roleController.deleteById.bind(roleController),
);

router.get(
  '/',
  checkToken,
  checkAccess(ROLES.admin),
  roleController.getAllData.bind(roleController),
);

module.exports = router;
