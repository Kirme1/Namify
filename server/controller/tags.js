const express = require('express');
const router = express.Router();
var Tag = require('../schema/tag');

// Create tag C.R.U.D. functions
router.get('/api/tags', function (req, res) {
    Tag.find(function (err, tags) {
        if(err) {
            return res.status(500).send(err);
        }
        res.json({ tags: tags});
        res.status(200);
    });
});

router.get('/api/tags/:id', function (req, res) {
    Tag.findById({_id: req.params.id}).exec(function (err, tag) {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(tag);
    });
});

router.post('/api/tags', function (req, res) {
    var tag = new Tag(req.body); 
    tag.save(function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        console.log('New tag ', tag.id, ' created');
        return res.status(201).json(tag);
    });
});

router.delete("/api/tags/:id", function (req, res) {
    var id = req.params.id;
    Tag.findByIdAndDelete(id, function (err, tag) {
      if (err) {
        return res.status(500).send(err);
      }
      if (tag == null) {
        return res.status(404).json({ message: "Tag not found" });
      }
      console.log("Tag successfully deleted :", tag._id);
      res.status(200).json(tag);
    });
  });

module.exports = router;
