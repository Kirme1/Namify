const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var accountSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String},
        password: { type: String},
        likedNames: [{name: {type: String, required: true},
                    liked: false,
                    disliked: false
                }
            ],
        likedComments: [{comment: {type: String, required: true},
                    liked: false,
                    disliked: false
                }
            ]
    }
);

module.exports = mongoose.model('accounts', accountSchema);