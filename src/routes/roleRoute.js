const express = require('express');
const roleController = require('../controllers/RoleController');

const router = express.Router();

router.get('/:id', roleController.getById.bind(roleController));
router.post('/', roleController.insertData.bind(roleController));
router.put('/:id', roleController.updateById.bind(roleController));
router.delete('/:id', roleController.deleteById.bind(roleController));

router.get('/', roleController.getAllData.bind(roleController));

module.exports = router;
