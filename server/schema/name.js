const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var nameSchema = new Schema(
    {
    _id: { type: String},
    likes: { type: Number,
    min: 0,
    },
    dislikes: { type: Number,
    min: 0,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'comments'}],
    }
);

module.exports = mongoose.model('names', nameSchema);