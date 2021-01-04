const Qna = require('../modals/qna');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  addQna: addQna,
  fetchQna: fetchQna,
  fetchAllQna: fetchAllQna,
  updateQna: updateQna,
  updateAllQna: updateAllQna,
  removeQna: removeQna,
};

function addQna(req, res) {
  let qna = new Qna({
    user: req.body.user,
    question: req.body.question,
    answer: req.body.answer,
    status: req.body.status,
  });
  qna.save()
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

function fetchQna(req, res) {
  Qna.find({
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

function fetchAllQna(req, res) {
  let query = req.body.query || {};
  let skip = 0;
  let limit = 10;
  if (req.body.skip) {
    skip = req.body.skip;
  }
  if (req.body.limit) {
    limit = req.body.limit;
  }
  Qna.find(query)
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

function updateQna(req, res) {
  req.body.updatedAt = new Date();
  Qna.findByIdAndUpdate({
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

function updateAllQna(req, res) {
  Qna.updateMany(req.body.query, {
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

function removeQna(req, res) {
  Qna.findByIdAndRemove({
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