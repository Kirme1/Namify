const express = require('express');
const router = express.Router();
var Name = require('../schema/name')
var Comment = require('../schema/comment');
const comment = require('../schema/comment');


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
        return res.status(200).send(name);
    });
});

router.post("/api/names", function (req, res) {
    var name = new Name(req.body);
    name.save(function (err) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(201).json(name);
    })
});

router.post("/api/names/:id/comments", function (req, res) {
    Name.findById({_id: req.params.id}, function (err, name) {
      if (err) {
        return res.status(500);
      }
      if (name == null) {
        return res.status(404).json({ message: "Name not found" });
      }
      var comment = new Comment(req.body);
      comment.save(function (err) {
        if (err) {
          return res.status(500);
        }
        console.log("Comment " + comment.text + " created.");
      });
      name.comments.push(comment);
      name.save();
      console.log("Comment added to ", name._id, " ", comment.text);
      return res.status(201).json(comment);
    });
  });

  router.delete("/api/names", function (req, res) {
    Name.deleteMany(function (err, name) {
      if(err) {
        return res.status(500).send(err);
      }
      res.status(200).json(name);
    });
  });

  router.delete("/api/names/:id", function(req, res) {
    var id = req.params.id;
    Name.findByIdAndDelete(id, function(err, name) {
      if(err) {
        return res.status(500).send(err);
      }
      if (name == null) {
        return res.status(404).json({ message: "Name was not found"});
      }
      res.status(200).json(name);
    });
  });

module.exports = router