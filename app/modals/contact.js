var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model(
  'Contact',
  new Schema({
    salutation: {
      type: String,
      default: null,
    },
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    mobile: {
      type: Number,
      default: 0,
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
    collection: 'Contact',
  })
);