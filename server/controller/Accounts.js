const express = require("express");
var Account = require("../schema/Account");
const router = express.Router();

//Create a comment 


// Accounts - database functions
// Show the list of Accounts
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

//Update an account
router.put("/api/accounts/:id", async (req, res) => {
  const account = Account.findById(req.params.id);
  if (account.id === req.body.id)
    updateAccount = Account
      .findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      )
      .then(() => {
        res.status(200).json({
          message: "Account updated successfully!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "An error Occured!",
        });
      });
});

//change one attribute

router.patch("/api/accounts/:id", (req, res) => {
  Account.findById(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
    })
    .then((account) => {
      if (!account) {
        return res.status(404).send();
      }
      res.status(201).send(account);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Delete an account by username
router.delete("/api/accounts/:id", function (req, res) {
  const id = req.params.id;
  Account.findByIdAndDelete(id, function (err, account) {
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