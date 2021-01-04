var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model(
  'Tutorial',
  new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    video: {
      type: String,
      default: null,
    },
    audio: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    visitor: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: 'active',
    },
  }, {
    timestamps: true,
    collection: 'Tutorial',
  })
);