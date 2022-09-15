const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var tagSchema = new Schema(
    {
        _id : {type : String, required : true}
    }
);

module.exports = mongoose.model('tags', tagSchema);