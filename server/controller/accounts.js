const express = require("express");
const router = express.Router();
var Account = require("../schema/Account");
const bcrypt = require("bcryptjs");

//Update an account
router.put("/api/v1/accounts/:id", (req, res) => {
  let email = req.params.id;
  Account.findOne({ email: email }, function(err, account) {
    if(err) {return res.status(500).send(err);}
    if(account === null) {return res.status(404).json({'error': 'account not found'});}
    account.name = req.body.name;
    account.email = req.body.email;
    account.password = bcrypt.hashSync(req.body.password, 10)
    account.save();
    return res.status(201).json(account)
  });
});

//Change liked names
router.patch("/api/v1/accounts/:id/likedNames", (req, res) => {
  let email = req.params.id;
  let hasName = false;
  Account.findOne({ email: email }, function(err, account) {
    if(err) {return res.status(500).send(err);}
    if(account === null) {return res.status(404).json({'error': 'account not found'});}
    account.likedNames.forEach(name => {
      if(name.name === req.body.name) {
        hasName = true
        name.liked = req.body.liked
        name.disliked = req.body.disliked
        account.save()
        return res.status(204).json(name)
      }
    });
    if(!hasName) {
      account.likedNames.push(req.body)
      account.save()
      console.log(account.likedNames)
      return res.status(204).json(account.likedNames)
    }
  });
})

//Change liked comments
router.patch("/api/v1/accounts/:id/likedComments", (req, res) => {
  let email = req.params.id;
  let hasComment = false;
  Account.findOne({ email: email }, function(err, account) {
    if(err) {return res.status(500).send(err);}
    if(account === null) {return res.status(404).json({'error': 'account not found'});}
    account.likedComments.forEach(comment => {
      if(comment.comment === req.body.comment) {
        hasComment = true
        comment.liked = req.body.liked
        comment.disliked = req.body.disliked
        account.save()
        return res.status(204).json(comment)
      }
    });
    if(!hasComment) {
      account.likedComments.push(req.body)
      account.save()
      console.log(account.likedComments)
      return res.status(204).json(account.likedComments)
    }
  });
})

// Delete likes and dislikes of account
router.patch("/api/v1/accounts/:id/deleteLikesAndDislikes", function (req, res) {
  let email = req.params.id;
  Account.findOne({ email: email }, function(err, account) {
    if(err) {return res.status(500).send(err);}
    if(account === null) {return res.status(404).json({'error': 'account not found'});}
    account.likedNames = [];
    account.likedComments = [];
    account.save()
    return res.status(200).json(account)
  });
})

// Delete an account by username
router.delete("/api/v1/accounts/:id", function (req, res) {
  const email = req.params.id;
  Account.findOneAndDelete({ email: email}, function (err, account) {
    if (err) {
      return res.status(500).send(err);
    }
    if (account == null) {
      return res.status(404).json({ message: "Account not found" });
    }
    console.log("Account is successfully deleted:", account._id);
    res.status(200).json({ message: "Account successfully deleted:", account });
  });
});


module.exports = router;