const Question = require('../modals/question');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  addQuestion: addQuestion,
  fetchQuestion: fetchQuestion,
  fetchAllQuestion: fetchAllQuestion,
  fetchQuestionPaper: fetchQuestionPaper,
  updateQuestion: updateQuestion,
  updateAllQuestion: updateAllQuestion,
  removeQuestion: removeQuestion,
};

function addQuestion(req, res) {
  const query = {
    questionDetails: req.body.questionDetails
  };
  Question.find(query)
    .then(result => {
      if (result.length > 0) {
        res.status(400);
        return res.json({
          success: false,
          message: 'Data already exit!',
        });
      } else {
        let question = new Question({
          questionDetails: req.body.questionDetails,
          questionAttachment: req.body.questionAttachment,
          answerDetails: req.body.answerDetails,
          answerAttachment: req.body.answerAttachment,
          answerIndex: req.body.answerIndex,
          givenIndex: req.body.givenIndex,
          optionOne: req.body.optionOne,
          optionTwo: req.body.optionTwo,
          optionThree: req.body.optionThree,
          optionFour: req.body.optionFour,
          type: req.body.type,
          status: req.body.status,
        });
        question.save()
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

function fetchQuestion(req, res) {
  Question.find({
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

function fetchAllQuestion(req, res) {
  let query = req.body.query || {};
  let skip = 0;
  let limit = 10;
  if (req.body.skip) {
    skip = req.body.skip;
  }
  if (req.body.limit) {
    limit = req.body.limit;
  }
  Question.find(query)
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

function fetchQuestionPaper(req, res) {
  const questionLimit = req.body.questionLimit ? parseInt(req.body.questionLimit) : 50;
  Question.aggregate([{
    $sample: {
      size: questionLimit
    }
  }]).then(response => {
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

function updateQuestion(req, res) {
  req.body.updatedAt = new Date();
  Question.findByIdAndUpdate({
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

function updateAllQuestion(req, res) {
  Question.updateMany(req.body.query, {
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

function removeQuestion(req, res) {
  Question.findByIdAndRemove({
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