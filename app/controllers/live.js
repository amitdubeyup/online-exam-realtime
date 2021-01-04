const Live = require('../modals/live');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    addLive: addLive,
    fetchLive: fetchLive,
    fetchAllLive: fetchAllLive,
    updateLive: updateLive,
    updateAllLive: updateAllLive,
    removeLive: removeLive,
};

function addLive(req, res) {
    let live = new Live({
        user: req.body.user,
        video: req.body.video,
        image: req.body.image,
        title: req.body.title,
        dateTime: req.body.dateTime,
        status: req.body.status,
    });
    live.save()
        .then(response => {
            res.status(200);
            return res.json({
                success: true,
                message: 'Data saved successfully!',
                data: response,
            });
        })
        .catch(error => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to save data!',
                error: error,
            });
        });
}

function fetchLive(req, res) {
    Live.find({
        _id: req['token']['_id']
    }).then(response => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Data fetched successfully!',
            data: response,
        });
    }).catch(error => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch data!',
            error: error,
        });
    });
}

function fetchAllLive(req, res) {
    let query = req.body.query || {};
    let skip = 0;
    let limit = 10;
    if (req.body.skip) {
        skip = req.body.skip;
    }
    if (req.body.limit) {
        limit = req.body.limit;
    }
    Live.find(query)
        .sort({
            createdAt: -1
        })
        .skip(skip)
        .limit(limit)
        .then(response => {
            res.status(200);
            return res.json({
                success: true,
                message: 'Data fetched successfully!',
                data: response,
            });
        })
        .catch(error => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to fetch data!',
                error: error,
            });
        });
}

function updateLive(req, res) {
    req.body.updatedAt = new Date();
    Live.findByIdAndUpdate({
        _id: new ObjectId(req['token']['_id'])
    }, {
        $set: req.body
    }, {
        new: true
    })
        .then(response => {
            res.status(200);
            return res.json({
                success: true,
                message: 'Data updated successfully!',
                data: response,
            });
        })
        .catch(error => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to update data!',
                error: error,
            });
        });
}

function updateAllLive(req, res) {
    Live.updateMany(req.body.query, {
        $set: req.body.data
    }, {
        multi: true
    })
        .then(response => {
            res.status(200);
            return res.json({
                success: true,
                message: 'Data updated successfully!',
                data: response,
            });
        })
        .catch(error => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to update data!',
                error: error,
            });
        });
}

function removeLive(req, res) {
    Live.findByIdAndRemove({
        _id: req['token']['_id'],
    })
        .then(response => {
            res.status(200);
            return res.json({
                success: true,
                message: 'Data removed successfully!',
            });
        })
        .catch(error => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to remove data!',
                error: error,
            });
        });
}