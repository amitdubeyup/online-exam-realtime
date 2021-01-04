var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model(
  'Question',
  new Schema({
    questionDetails: {
      type: String,
      default: null,
    },
    questionAttachment: {
      type: String,
      default: null,
    },
    answerDetails: {
      type: String,
      default: null,
    },
    answerAttachment: {
      type: String,
      default: null,
    },
    answerIndex: {
      type: Number,
      default: 5,
    },
    givenIndex: {
      type: Number,
      default: 5,
    },
    optionOne: {
      type: String,
      default: null,
    },
    optionTwo: {
      type: String,
      default: null,
    },
    optionThree: {
      type: String,
      default: null,
    },
    optionFour: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'objective',
    },
    status: {
      type: String,
      default: 'active',
    },
  }, {
    timestamps: true,
    collection: 'Question',
  })
);