const express = require('express');
const router = express.Router();
var Tag = require('../schema/tag');
var Name = require('../schema/name');

// Create tag C.R.U.D. functions
//Get all tags
router.get('/api/v1/tags', function (req, res) {
    Tag.find(function (err, tags) {
        if(err) {
            return res.status(500).send(err);
        }
        res.json({ tags: tags});
        res.status(200);
    });
});

//Get specific tag
router.get('/api/v1/tags/:id', function (req, res) {
    Tag.findById({_id: req.params.id}).exec(function (err, tag) {
        if(tag == null)
        {
          return res.status(404).json({ message: "Tag not found" });
        }
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(200).send(tag);
    });
});

// filter by tag
router.get('/api/v1/tags/:id/names', function(req, res) {
  console.log("finding");
  Name.find({tags: req.params.id}).exec(function (
    err,
    name
  ) {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.status(200).json(name);
  });
});

//Create new tag
router.post('/api/v1/tags', function (req, res) {
    var tag = new Tag(req.body); 
    tag.save(function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        console.log('New tag ', tag.id, ' created');
        return res.status(201).json(tag);
    });
});

//delete tag
router.delete("/api/v1/tags/:id", function (req, res) {
    var id = req.params.id;
    Tag.findById(id, function (err, tag) {
      if (err) {
        return res.status(500).send(err);
      }
      if (tag == null) {
        return res.status(404).json({ message: "Tag not found" });
      }
      Tag.findByIdAndDelete(id, function (err, tag) {
        if (err) {
            return res.status(500).send(err);
          }
          console.log("Tag successfully deleted :", tag.id);
          res.status(200).json(tag);
      })
    });
  });

  router.delete("/api/v1/tags", function (req, res) {
    Tag.deleteMany(function (err, tag) {
      if(err) {
        return res.status(500).send(err);
      }
      res.status(200).json(tag);
    });
  });

module.exports = router;
