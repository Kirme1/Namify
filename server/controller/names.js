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

router.get('/api/names/:id', function(req, res){
    Name.findById({_id: req.params.id})
    .populate('comments').exec(function (err, name){
        if(err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(name.names);
    });
});

module.exports = router