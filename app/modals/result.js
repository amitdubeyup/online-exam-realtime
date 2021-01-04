var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model(
  'Result',
  new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    examName: {
      type: String,
      default: null,
    },
    questions: {
      type: Array,
      default: [],
    },
    totalQuestion: {
      type: Number,
      default: 0,
    },
    correctAnswer: {
      type: Number,
      default: 0,
    },
    wrongAnswer: {
      type: Number,
      default: 0,
    },
    leftAnswer: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: 'active',
    },
  }, {
    timestamps: true,
    collection: 'Result',
  })
);