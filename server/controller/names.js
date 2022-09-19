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


//get specific name
router.get('/api/names/:id', function(req, res){
    Name.findById({_id: req.params.id})
    .populate('comments').exec(function (err, id){
        if(err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(id);
    });
});

//get all comments for specific name
router.get('/api/names/:id/comments', function(req, res) {
  Name.findById({_id: req.params.id})
  .populate("comments")
  .exec(function (err, name) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({comments: name.comments})
    return res.status(200).send(name.comments);
  });
});

//get specific comment for specific name
router.get('/api/names/:name_id/comments/:comment_id', function(req, res) {
  Name.findById({_id: req.params.name_id})
  .populate({path: "comments", 
    match: { _id: { $eq: req.params.comment_id } },
  })
  .exec(function (err, name, comment) {
    if(err) {
      return res.status(500).send(err);
    }
    if(comment === null || name === null){
      return res.status(404).json({message: "comment does not exist"});
    }
    return res.status(200).send(name.comments);
  });
});

// get all tags for specific name
router.get('/api/names/:id/tags', function(req, res) {
  Name.findById({_id: req.params.id})
  .populate('tags')
  .exec(function (err, name) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(name.tags);
  });
});

//get specific tag for specific name
router.get('/api/names/:name_id/tags/:tag_id', function(req, res) {
  Name.findById({_id: req.params.name_id})
  .populate({path: "tags", 
    match: { _id: { $eq: req.params.tag_id } },
  })
  .exec(function (err, name, tag) {
    if(err) {
      return res.status(500).send(err);
    }
    if(tag === null || name === null){
      return res.status(404).json({message: "tag does not exist"});
    }
    return res.status(200).send(name.tags);
  });
});

//get all names with tag (not working)
router.get('/api/names?tag=:tag', function(req, res) {
  console.log("finding");
  var tagId = '';
  Tag.find({tag: req.params.tag})
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

//create new name
router.post("/api/names", function (req, res) {
    var name = new Name(req.body);
    name.save(function (err) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(201).json(name);
    })
});

//create comment for specific name
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

  //delete all names
  router.delete("/api/names", function (req, res) {
    Name.deleteMany(function (err, name) {
      if(err) {
        return res.status(500).send(err);
      }
      res.status(200).json(name);
    });
  });

  //delete specific name
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

  //delete specific comment from specific name
  router.delete('/api/names/:name_id/comments/:comment_id', function(req, res) {
    var id = req.params.comment_id;
    Comment.findById(id)
    .exec(function (err, comment) {
      if(err) {
        return res.status(500).send(err);
      }
      if(comment == null){
        return res.status(404).json({message: "comment does not exist"});
      }
      Comment.findByIdAndDelete(id, function (err, comment) {
        if (err) {
            return res.status(500).send(err);
          }
          console.log("Tag successfully deleted :", comment.id);
          res.status(200).json(comment);
      })
    });
  });

  //remove specific tag from specific name
  router.delete("/api/names/:name_id/tags/:tag_id", function (req, res) {
    Name.findByIdAndUpdate({_id: req.params.name_id})
    .populate("tags")
    .exec(function (err, name, tag) {
    if(err) {
      return res.status(500).send(err);
    }
    if(tag === null || name === null){
      return res.status(404).json({message: "comment does not exist"});
    }
    name.tags.pull({_id: req.params.tag_id});
    name.save();
    return res.status(200).send(name.comments);
  });
  });

  //change number of likes and dislikes for a specific name
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

  //change number of likes and dislikes for specific comment
  router.patch("/api/names/:name_id/comments/:comment_id", function(req, res) {
    var id = req.params.comment_id;
    Comment.findByIdAndUpdate(id, req.body, { likes: req.likes, dislikes: req.dislikes})
    .then(function (comment) {
      if (comment == null) {
        return res.status(404).send();
      }
      res.status(204).send(comment);
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
        console.log(tag._id + " created.");
      });
      return res.status(201).json(name);
    });
  });

module.exports = router