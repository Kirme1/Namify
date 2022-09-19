const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var nameSchema = new Schema(
    {
    _id: {type: String, required: true},
    likes: { type: Number,
    min: 0, required: true
    },
    dislikes: { type: Number,
    min: 0, required: true
    },
    comments: [{ type: Schema.Types.String, ref: 'comments'}],
    tags: [{ type: Schema.Types.String, ref: 'tags'}]
    }
);

module.exports = mongoose.model('names', nameSchema);