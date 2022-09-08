const express = require('express');
const router = express.Router();
var Name = require('../schema/name')

// Names - C.R.U.D functions
router.get('/api/names', function (req, res) {
    Name.find(function (err, names) {
        if(err) {
            return res.status(500).send(err);
        }
        res.json({ names: names});
        res.status(200);
    });
});

module.exports = router