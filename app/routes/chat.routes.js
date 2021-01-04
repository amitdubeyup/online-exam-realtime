const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/chat');
const ChatGuard = require('../auth/auth');

router.post('/add', ChatGuard, ChatController.addChat);
router.post('/fetch', ChatGuard, ChatController.fetchChat);
router.post('/fetch-all', ChatGuard, ChatController.fetchAllChat);
router.post('/update', ChatGuard, ChatController.updateChat);
router.post('/update-all', ChatGuard, ChatController.updateAllChat);
router.post('/remove', ChatGuard, ChatController.removeChat);

router.get('/', function(req, res, next) {
  res.status(200);
  res.json({
    message: 'Welcome to coolest api on the earth !',
  });
});

module.exports = router;