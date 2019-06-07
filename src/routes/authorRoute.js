const express = require('express');
const authorController = require('../controllers/AuthorController');
const { baseValidator, authorValidator } = require('../validators/index.js');
const errorWrap = require('../middlewares/appMiddlewares/errorWrap');

const router = express.Router();

router.all('/:id', errorWrap(baseValidator.checkId));

router.get('/:id', errorWrap(authorController.getById.bind(authorController)));
router.post('/', errorWrap(authorValidator.checkBody, authorController.insertData.bind(authorController)));
router.put('/:id', errorWrap(authorController.updateById.bind(authorController)));
router.delete('/:id', errorWrap(authorController.deleteById.bind(authorController)));

router.get('/', errorWrap(authorController.getAllData.bind(authorController)));

module.exports = router;
