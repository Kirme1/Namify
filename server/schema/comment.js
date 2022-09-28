const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new Schema(
    {
        _id: {type: String, required: true},
        text: {type: String, required: true},
        likes: {type: Number, min: 0},
        dislikes: {type: Number, min: 0},
        name: { type: Schema.Types.String, ref: 'accounts'}
    }
);

module.exports = mongoose.model('comments', commentSchema);