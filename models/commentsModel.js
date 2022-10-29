const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    post_id: {
        type: String,
        min: 6,
        max: 100,
        require: true
    },
    name: {
        type: String,
        min: 6,
        max: 100,
        require: true
    },
    url: {
        type: String,
        default: ' ',
        max: 255,
        require: true
    },
    comment: {
        type: String,
        min: 6,
        max: 2048,
        require: true
    },
    dateTime: {
        type: Date,
        default: Date.now,
    }

});

module.exports = mongoose.model('Comments', commentSchema);