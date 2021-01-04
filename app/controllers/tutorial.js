const Tutorial = require('../modals/tutorial');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  addTutorial: addTutorial,
  fetchTutorial: fetchTutorial,
  fetchAllTutorial: fetchAllTutorial,
  updateTutorial: updateTutorial,
  updateAllTutorial: updateAllTutorial,
  updateTutorialVisitor: updateTutorialVisitor,
  removeTutorial: removeTutorial,
};

function addTutorial(req, res) {
  let tutorial = new Tutorial({
    user: req.body.user,
    video: req.body.video,
    audio: req.body.audio,
    image: req.body.image,
    text: req.body.text,
    visitor: req.body.visitor,
    category: req.body.category,
    type: req.body.type,
    status: req.body.status,
  });
  tutorial.save()
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

function fetchTutorial(req, res) {
  Tutorial.find({
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

function fetchAllTutorial(req, res) {
  let query = req.body.query || {};
  let skip = 0;
  let limit = 10;
  if (req.body.skip) {
    skip = req.body.skip;
  }
  if (req.body.limit) {
    limit = req.body.limit;
  }
  Tutorial.find(query)
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

function updateTutorial(req, res) {
  Tutorial.findByIdAndUpdate({
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

function updateAllTutorial(req, res) {
  Tutorial.updateMany(req.body.query, {
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

function updateTutorialVisitor(req, res) {
  Tutorial.findByIdAndUpdate({
      _id: req.body._id
    }, {
      $inc: {
        'visitor': 1
      }
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

function removeTutorial(req, res) {
  Tutorial.findByIdAndRemove({
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