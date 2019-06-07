const express = require('express');
const statusController = require('../controllers/StatusController');
const { checkId } = require('../validators/baseValidator');
const errorWrap = require('../middlewares/appMiddlewares/errorWrap');

const router = express.Router();

router.use('/:id', checkId);

router.get('/:id', errorWrap(statusController.getById.bind(statusController)));
router.post('/', errorWrap(statusController.insertData.bind(statusController)));
router.put(
  '/:id',
  errorWrap(statusController.updateById.bind(statusController)),
);
router.delete(
  '/:id',
  errorWrap(statusController.deleteById.bind(statusController)),
);

router.get('/', statusController.getAllData.bind(statusController));

module.exports = router;
