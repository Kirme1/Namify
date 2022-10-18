const express = require('express');
const router = express.Router();
const Name = require('../schema/name');
const Comment = require('../schema/comment');
const Tag = require('../schema/tag')

// Names - C.R.U.D functions
router.get('/api/v1/names', function (req, res) {
    Name.find(function (err, names) {
        if(err) {
            return res.status(500).send(err);
        }
        res.json({ names: names});
        res.status(200);
    });
});

//get names sorted by likes
router.get('/api/v1/names/sortLikes', function (req, res) {
  var sortedLikes = [];
  Name.find(function (err, names) {
      if(err) {
          return res.status(500).send(err);
      }
      for (var i = 0; i < names.length; i++) {
        sortedLikes.push([names[i].likes, names[i]]);
      }
    
    sortedLikes.sort(function(a, b) {
        return b[0] - a[0];
    });
      res.json(sortedLikes);
      res.status(200);
  });
});

//get names sorted by dislikes
router.get('/api/v1/names/sortDislikes', function (req, res) {
  var sortedLikes = [];
  Name.find(function (err, names) {
      if(err) {
          return res.status(500).send(err);
      }
      for (var i = 0; i < names.length; i++) {
        sortedLikes.push([names[i].dislikes, names[i]]);
      }
    
    sortedLikes.sort(function(a, b) {
        return b[0] - a[0];
    });
      res.json(sortedLikes);
      res.status(200);
  });
});

//get names sorted by difference in likes and dislikes
router.get('/api/v1/names/sortControversial', function (req, res) {
  var sortedLikes = [];
  Name.find(function (err, names) {
      if(err) {
          return res.status(500).send(err);
      }
      for (var i = 0; i < names.length; i++) {
        var dislikes = names[i].dislikes;
        var likes = names[i].likes;
        sortedLikes.push([dislikes + likes, names[i]]);
      }
    
    sortedLikes.sort(function(a, b) {
        return b[0] - a[0];
    });
      res.json(sortedLikes);
      res.status(200);
  });
});

router.get('/api/v1/names/shuffle', function (req, res) {
  Name.find(function (err, names) {
      if(err) {
          return res.status(500).send(err);
      }
      var random = Math.floor(Math.random() * names.length);
      var name = names[random];
      res.json({name});
      res.status(200);
  });
});

//create new name
router.post("/api/v1/names", function (req, res) {
  var name = new Name(req.body);
  name.save(function (err) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(201).json(name);
  })
});

 //delete all names
 router.delete("/api/v1/names", function (req, res) {
  Name.deleteMany(function (err, name) {
    if(err) {
      return res.status(500).send(err);
    }
    res.status(200).json(name);
  });
});

//create comment for specific name
router.post("/api/v1/names/:id/comments", function (req, res) {
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
 
  //delete specific name
  router.delete("/api/v1/names/:id", function(req, res) {
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
  router.delete('/api/v1/names/:name_id/comments/:comment_id', function(req, res) {
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

          //Remove comment from array
          Name.findById({_id: req.params.name_id}).exec(function (err, name) {
            if (err) {
              return res.status(500).send(err);
            }
            if(name === null){
              return res.status(404).json({message: "Name does not exist"});
            }
            var index = name.comments.indexOf(id);
            if (index > -1) { 
              // Only splice array when item is found
              name.comments.splice(index, 1);
              name.save();
            }
            else {return res.status(500).send(err);}
          });

          console.log("Tag successfully deleted :", comment.id);
          res.status(200).json(comment);
      })
    });
  });

  //remove specific tag from specific name
  router.delete("/api/v1/names/:name_id/tags/:tag_id", function (req, res) {
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
  router.patch("/api/v1/names/:id", function(req, res) {
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
  router.patch("/api/v1/names/:name_id/comments/:comment_id", function(req, res) {
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
  router.patch("/api/v1/names/:name_id/tags/:tag_id", function (req, res) {
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

//get specific name
router.get('/api/v1/names/:id', function(req, res){
  Name.findById({_id: req.params.id})
  .populate('comments').exec(function (err, id){
      if(err) {
          return res.status(500).send(err);
      }
      if (id == null) {
        return res.status(404).json({ message: "Name not found" });
      }
      return res.status(200).json(id);
  });
});

//get all comments for specific name
router.get('/api/v1/names/:id/comments', function(req, res) {
  Name.findById({_id: req.params.id})
  .populate("comments")
  .exec(function (err, name) {
    if (err) {
      return res.status(500).send(err);
    }
    if(name === null){
      return res.status(404).json({message: "Name does not exist"});
    }
    res.json({comments: name.comments})
    return res.status(200);
  });
});

//get comments sorted for a name
router.get('/api/v1/names/:id/comments/sorted', function(req, res) {
  sortedComments = [];
  Name.findById({_id: req.params.id})
  .populate("comments")
  .exec(function (err, name) {
    if (err) {
      return res.status(500).send(err);
    }
    if(name === null){
      return res.status(404).json({message: "Name does not exist"});
    }
    for (var i = 0; i < name.comments.length; i++) {
      sortedComments.push([name.comments[i].likes, name.comments[i]]);
    }
    sortedComments.sort(function(a, b) {
      return b[0] - a[0];
    });
    res.send({comments: sortedComments})
    return res.status(200);
  });
});

//get specific comment for specific name
router.get('/api/v1/names/:name_id/comments/:comment_id', function(req, res) {
  Name.findById({_id: req.params.name_id})
  .populate({path: "comments", 
    match: { _id: { $eq: req.params.comment_id } },
  })
  .exec(function (err, name, comment) {
    if(err) {
      return res.status(500).send(err);
    }
    if(comment === null){
      return res.status(404).json({message: "comment does not exist"});
    }
    if(name === null){
      return res.status(404).json({message: "Name does not exist"});
    }
    res.json({comments: name.comments})
    return res.status(200);
  });
});

// get all tags for specific name
router.get('/api/v1/names/:id/tags', function(req, res) {
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
router.get('/api/v1/names/:name_id/tags/:tag_id', function(req, res) {
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

module.exports = router