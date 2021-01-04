const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const UserGuard = require('../auth/auth');

router.post('/login', UserController.loginUser);
router.post('/register', UserController.registerUser);
router.post('/fetch', UserGuard, UserController.fetchUser);
router.post('/fetch-all', UserGuard, UserController.fetchAllUser);
router.post('/update', UserGuard, UserController.updateUser);
router.post('/update-all', UserGuard, UserController.updateAllUser);
router.post('/remove', UserGuard, UserController.removeUser);

router.get('/', function(req, res, next) {
  res.status(200);
  res.json({
    message: 'Welcome to coolest api on the earth !',
  });
});

module.exports = router;