var express = require("express");
var Account = require("../schema/Account");
var router = express.Router();

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
  const Account = account.findById(req.params.id);
  if (Account.id === req.body.id)
    updateAccount = account
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
  account.findByIdUpdate(req.params.id, req.body, {
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
  username.findByIdAndDelete(id, function (err, account) {
    if (err) {
      return res.status(500).send(err);
    }
    if (account == null) {
      return res.status(404).json({ message: "Account not found" });
    }
    console.log("Account is successfully deleted:", account.name);
    res.status(200).json({ message: "Account successfully deleted:", account });
  });
});


module.exports = router;