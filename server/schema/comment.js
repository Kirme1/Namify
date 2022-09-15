const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new Schema(
    {
        text: {type: String, required: true},
        likes: {type: Number, min: 0},
        dislikes: {type: Number, min: 0},
    },
);

module.exports = mongoose.model('comments', commentSchema);