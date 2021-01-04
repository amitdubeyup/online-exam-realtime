var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model(
    'Qna',
    new Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: null
        },
        question: {
            type: String,
            default: null,
        },
        answer: {
            type: String,
            default: null,
        },
        status: {
            type: String,
            default: 'active',
        },
    }, {
        timestamps: true,
        collection: 'Qna',
    })
);