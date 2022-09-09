const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var accountSchema = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String},
        password: { type: String},

    }
);

module.exports = mongoose.model('account', accountSchema);
