var express = require("express");
const account = require("../schema/Account");
var router = express.Router();

//Create a comment 


// Accounts - database functions
// Show the list of Accounts
router.get("/api/accounts", function (req, res) {
  account
    .find(function (err, accounts) {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({accounts: accounts});
      res.status(200);
    });
});

// Show Account with username
router.get("/api/accounts/:username", function (req, res) {
  account
    .findByUsername(req.params.username)
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
router.put("/api/accounts/:username", async (req, res) => {
  const Account = account.findByUsername(req.params.username);
  if (Account.username === req.body.username)
    updateAccount = account
      .findByUsernameAndUpdate(
        req.params.username,
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

router.patch("/api/accounts/:username", (req, res) => {
  account.findByUsernameAndUpdate(req.params.username, req.body, {
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
router.delete("/api/accounts/:username", function (req, res) {
  const username = req.params.username;
  username.findByUssernameAndDelete(username, function (err, account) {
    if (err) {
      return res.status(500).send(err);
    }
    if (username == null) {
      return res.status(404).json({ message: "Account not found" });
    }
    console.log("Account is successfully deleted:", account.username);
    res.status(200).json({ message: "Account successfully deleted:", account });
  });
});


module.exports = router;