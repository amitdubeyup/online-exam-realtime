const Result = require('../modals/result');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  addResult: addResult,
  fetchResult: fetchResult,
  fetchAllResult: fetchAllResult,
  updateResult: updateResult,
  removeResult: removeResult,
};

function addResult(req, res) {
  let result = new Result({
    user: req.body.user,
    examName: req.body.examName,
    totalQuestion: req.body.totalQuestion,
    correctAnswer: req.body.correctAnswer,
    wrongAnswer: req.body.wrongAnswer,
    leftAnswer: req.body.leftAnswer,
    status: req.body.status,
  });
  result.save()
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

function fetchResult(req, res) {
  Result.find({
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

function fetchAllResult(req, res) {
  let query = req.body.query || {};
  let skip = 0;
  let limit = 10;
  if (req.body.skip) {
    skip = req.body.skip;
  }
  if (req.body.limit) {
    limit = req.body.limit;
  }
  Result.find(query)
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

function updateResult(req, res) {
  req.body.updatedAt = new Date();
  Result.findByIdAndUpdate({
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

function removeResult(req, res) {
  Result.findByIdAndRemove({
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