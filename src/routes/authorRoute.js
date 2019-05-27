const express = require('express');
const authorController = require('../controllers/AuthorController');
const {
  baseValidator,
  genreValidator: authorValidator,
} = require('../validators/Validators.js');

const router = express.Router();

router.use('/:id', baseValidator.checkId);

router.get('/:id', authorController.getById.bind(authorController));
router.post(
  '/',
  authorValidator.checkBody,
  authorController.insertData.bind(authorController),
);
router.put('/:id', authorController.updateById.bind(authorController));
router.delete('/:id', authorController.deleteById.bind(authorController));

router.get('/', authorController.getAllData.bind(authorController));

module.exports = router;
