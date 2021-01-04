const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contact');
const ContactGuard = require('../auth/auth');

router.post('/add', ContactGuard, ContactController.addContact);
router.post('/fetch', ContactGuard, ContactController.fetchContact);
router.post('/fetch-all', ContactGuard, ContactController.fetchAllContact);
router.post('/update', ContactGuard, ContactController.updateContact);
router.post('/update-all', ContactGuard, ContactController.updateAllContact);
router.post('/remove', ContactGuard, ContactController.removeContact);

router.get('/', function(req, res, next) {
  res.status(200);
  res.json({
    message: 'Welcome to coolest api on the earth !',
  });
});

module.exports = router;