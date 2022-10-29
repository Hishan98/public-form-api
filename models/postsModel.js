const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    user_name: {
        type: String,
        max: 50,
        require: true
    },
    user_image_url: {
        type: String,
        require: true
    },
    post_media: {
        type: String,
        default: ' ',
        max: 1024,
    },
    caption: {
        type: String,
        min: 6,
        max: 2048,
        require: true
    },
    date: {
        type: Date,
        default: Date.now,
    }

});

module.exports = mongoose.model('Posts', postsSchema);