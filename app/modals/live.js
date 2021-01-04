var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model(
    'Live',
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
        image: {
            type: String,
            default: null,
        },
        title: {
            type: String,
            default: null,
        },
        dateTime: {
            type: String,
            default: null,
        },
        status: {
            type: String,
            default: 'active',
        },
    }, {
        timestamps: true,
        collection: 'Live',
    })
);