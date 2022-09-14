const express = require('express');
const router = express.Router();
const Name = require('../schema/name');
const Comment = require('../schema/comment');
const Tag = require('../schema/tag')

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

router.get('/api/names/:id/comments', function(req, res) {
  Name.findById({_id: req.params.id})
  .populate("comments")
  .exec(function (err, name) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(name.comments);
  });
});

router.get('/api/names/:name_id/comments/:comment_id', function(req, res) {
  Comment.findOne({name: req.params.name_id})
  .where({_id: req.params.comment_id})
  .exec(function (err, comment) {
    if(err) {
      return res.status(500).send(err);
    }
    if(comment == null){
      return res.status(404).json({message: "comment does not exist"});
    }
    return res.status(200).send(comment);
  });
});

router.get('/api/names/:id/tags', function(req, res) {
  Name.findById({_id: req.params.id})
  .populate("tags")
  .exec(function (err, name) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(name.tags);
  });
});

router.get('/api/names?tags=:tags', function (req, res) {
  console.log("finding");
  var tagId = '';
  Tag.find({tag: req.params.tags})
  .exec(function (err, tags) {
    if (err) {
      return res.status(500).send(err);
    }
    tagId = tags._id;
  });
  Name.filter(name=> name.tags.tag === tagId).exec(function (err, name) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).json(name);
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

  router.delete('/api/names/:name_id/comments/:comment_id', function(req, res) {
    Comment.findOneAndDelete({name: req.params.name_id})
    .where({_id: req.params.comment_id})
    .exec(function (err, comment) {
      if(err) {
        return res.status(500).send(err);
      }
      if(comment == null){
        return res.status(404).json({message: "comment does not exist"});
      }
      return res.status(200).json(comment);
    });
  });

  router.delete("/api/names/:name_id/tags/:tag_id", function (req, res) {
    var tag = '';
    Tag.findById({_id: req.params.tag_id}, function (err, foundTag) {
      if (err) {
        return res.status(500);
      }
      if (foundTag == null) {
        return res.status(404).json({ message: "Tag not found" });
      }
      tag = foundTag;
    })
    Name.findById({_id: req.params.name_id}, function (err, name) {
      if (err) {
        return res.status(500);
      }
      if (name == null) {
        return res.status(404).json({ message: "Name not found" });
      }
      name.tags.pull(tag);
      name.save(function (err) {
        if (err) {
          return res.status(500);
        }
        console.log(tags._id + " created.");
      });
      return res.status(201).json(name);
    });
  });

  router.patch("/api/names/:id", function(req, res) {
    var id = req.params.id;
    Name.findByIdAndUpdate(id, req.body, { likes: req.likes, dislikes: req.dislikes})
    .then(function (name) {
      if (name == null) {
        return res.status(404).send();
      }
      res.status(204).send(name);
    })
    .catch( function (err) {
      res.status(500).send(err);
    });
  });

  //Atach tag to name
  router.patch("/api/names/:name_id/tags/:tag_id", function (req, res) {
    var tag = '';
    Tag.findById({_id: req.params.tag_id}, function (err, foundTag) {
      if (err) {
        return res.status(500);
      }
      if (foundTag == null) {
        return res.status(404).json({ message: "Tag not found" });
      }
      tag = foundTag;
    })
    Name.findById({_id: req.params.name_id}, function (err, name) {
      if (err) {
        return res.status(500);
      }
      if (name == null) {
        return res.status(404).json({ message: "Name not found" });
      }
      name.tags.push(tag);
      name.save(function (err) {
        if (err) {
          return res.status(500);
        }
        console.log(tags._id + " created.");
      });
      return res.status(201).json(name);
    });
  });

module.exports = router