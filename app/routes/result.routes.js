const express = require('express');
const router = express.Router();
const ResultController = require('../controllers/result');
const ResultGuard = require('../auth/auth');

router.post('/add', ResultGuard, ResultController.addResult);
router.post('/fetch', ResultGuard, ResultController.fetchResult);
router.post('/fetch-all', ResultGuard, ResultController.fetchAllResult);
router.post('/update', ResultGuard, ResultController.updateResult);
router.post('/remove', ResultGuard, ResultController.removeResult);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;