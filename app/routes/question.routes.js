const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers/question');
const QuestionGuard = require('../auth/auth');

router.post('/add', QuestionGuard, QuestionController.addQuestion);
router.post('/fetch', QuestionGuard, QuestionController.fetchQuestion);
router.post('/fetch-all', QuestionGuard, QuestionController.fetchAllQuestion);
router.post('/fetch-question-paper', QuestionGuard, QuestionController.fetchQuestionPaper);
router.post('/update', QuestionGuard, QuestionController.updateQuestion);
router.post('/update-all', QuestionGuard, QuestionController.updateAllQuestion);
router.post('/remove', QuestionGuard, QuestionController.removeQuestion);

router.get('/', function(req, res, next) {
  res.status(200);
  res.json({
    message: 'Welcome to coolest api on the earth !',
  });
});

module.exports = router;