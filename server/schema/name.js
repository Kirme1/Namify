const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var nameSchema = new Schema(
    {
    id: { type: String},
    likes: { type: Number,
    min: 0,
    },
    dislikes: { type: Number,
    min: 0,
    }
    }
);

module.exports = mongoose.model('names', nameSchema);