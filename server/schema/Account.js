const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var accountSchema = new Schema(
    {
        _id: { type: String, required: true },
        email: { type: String},
        password: { type: String},

    }
);

module.exports = mongoose.model('accounts', accountSchema);