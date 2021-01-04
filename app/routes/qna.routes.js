const express = require('express');
const router = express.Router();
const QnaController = require('../controllers/qna');
const QnaGuard = require('../auth/auth');

router.post('/add', QnaGuard, QnaController.addQna);
router.post('/fetch', QnaGuard, QnaController.fetchQna);
router.post('/fetch-all', QnaGuard, QnaController.fetchAllQna);
router.post('/update', QnaGuard, QnaController.updateQna);
router.post('/update-all', QnaGuard, QnaController.updateAllQna);
router.post('/remove', QnaGuard, QnaController.removeQna);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;