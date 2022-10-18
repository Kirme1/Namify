const express = require('express');
const router = express.Router();
const https = require('https')
var Name = require('../schema/name')
const womenurl = 'https://www.statistikdatabasen.scb.se/sq/128159';
const menurl = 'https://www.statistikdatabasen.scb.se/sq/128176';

function createNames(url, res) {
    https.get(url, response => {
        var data = '';
        response.on('data', chunk => {
            data += chunk;
        });
        response.on('end', () => {
            data = JSON.parse(data);
            var numOfNames = data.data.length;
            for (var i = 0;i < numOfNames; i++) {
                var nameData = data.data[i];
                var nameObject = { _id: nameData.key[0].substring(1), likes: 0, dislikes: 0};
                var name = new Name(nameObject)
                name.save(function (err) {
                    if (err) {
                      res.status(500).send(err);
                    }
                  })
            }
        })
    }).on('error', err => {
        res.status(500).send(err);
    })
}

router.post("/api/v1/populate", function(req, res) {
    createNames(womenurl, res);
    createNames(menurl, res);
    res.status(200).json({ message: 'success!'})
});

module.exports = router;