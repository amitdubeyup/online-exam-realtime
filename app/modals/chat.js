var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model(
  'Chat',
  new Schema({
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    message: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: 'active',
    },
  }, {
    timestamps: true,
    collection: 'Chat',
  })
);