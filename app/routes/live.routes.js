const express = require('express');
const router = express.Router();
const LiveController = require('../controllers/live');
const LiveGuard = require('../auth/auth');

router.post('/add', LiveGuard, LiveController.addLive);
router.post('/fetch', LiveGuard, LiveController.fetchLive);
router.post('/fetch-all', LiveGuard, LiveController.fetchAllLive);
router.post('/update', LiveGuard, LiveController.updateLive);
router.post('/update-all', LiveGuard, LiveController.updateAllLive);
router.post('/remove', LiveGuard, LiveController.removeLive);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !',
    });
});

module.exports = router;