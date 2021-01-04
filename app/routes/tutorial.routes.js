const express = require('express');
const router = express.Router();
const TutorialController = require('../controllers/tutorial');
const TutorialGuard = require('../auth/auth');

router.post('/add', TutorialGuard, TutorialController.addTutorial);
router.post('/fetch', TutorialGuard, TutorialController.fetchTutorial);
router.post('/fetch-all', TutorialGuard, TutorialController.fetchAllTutorial);
router.post('/update', TutorialGuard, TutorialController.updateTutorial);
router.post('/update-all', TutorialGuard, TutorialController.updateAllTutorial);
router.post('/update-visitor', TutorialGuard, TutorialController.updateTutorialVisitor);
router.post('/remove', TutorialGuard, TutorialController.removeTutorial);

router.get('/', function(req, res, next) {
  res.status(200);
  res.json({
    message: 'Welcome to coolest api on the earth !',
  });
});

module.exports = router;