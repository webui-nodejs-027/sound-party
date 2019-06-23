const express = require('express');
const authorController = require('../controllers/AuthorController');
const { baseValidator, authorValidator } = require('../validators/index.js');
const errorWrap = require('../middlewares/appMiddlewares/errorWrap');

const router = express.Router();

router.all('/:id', baseValidator.checkId);

router.get('/:id', errorWrap(authorController.getById.bind(authorController)));
router.post(
  '/',
  authorValidator.checkBody,
  errorWrap(
    authorController.insertData.bind(authorController),
  ),
);
router.put(
  '/:id',
  authorValidator.checkBody,
  errorWrap(authorController.updateById.bind(authorController)),
);
router.delete(
  '/:id',
  errorWrap(authorController.deleteById.bind(authorController))
);

router.get('/', errorWrap(authorController.getAllData.bind(authorController)));

module.exports = router;
