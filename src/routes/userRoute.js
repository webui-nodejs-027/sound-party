const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();

function mustAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(400)
      .send('Not Authenticated');
  }
  next();
  return null;
}

router.get('/', userController.getAllData.bind(userController));
router.get('/:id', mustAuthenticated, userController.getById.bind(userController));
router.delete('/:id', userController.deleteById.bind(userController));
router.post('/login', userController.login.bind(userController));
router.post('/', userController.addUser.bind(userController));

module.exports = router;
