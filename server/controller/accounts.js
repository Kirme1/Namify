const express = require("express");
const router = express.Router();
var Account = require("../schema/Account");
const bcrypt = require("bcryptjs")

//Create a comment 


// Accounts - database functions
// Show the list of Accounts
/*
router.get("/api/accounts", function (req, res) {
  Account.find(function (err, accounts) {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({accounts: accounts});
      res.status(200);
    });
});

//Postman 

router.post("/api/accounts", function (req, res, next) {
  var account = new Account(req.body);
  account.save(function (err) {
    if (err) {
      return res.status(500).send(err);
    }
    console.log("New Account ", account._id, "created");
    return res.status(201).json(account);
  });
});

// Show Account with username
router.get("/api/accounts/:id", function (req, res) {
  Account
    .findById(req.params.id)
    .then((response) => {
      res.status(200).json({  //found
        response,
      });
    })
    .catch((error) => {
      res.status(400).json({  //not found
        message: "An error Occured!",
      });
    });
});
*/
//Update an account
router.put("/api/accounts/:id", (req, res) => {
  let email = req.params.id;
  console.log(req.body)
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

// Delete an account by username
router.delete("/api/accounts/:id", function (req, res) {
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