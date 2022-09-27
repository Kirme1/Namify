const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const Account = require("../schema/Account")
const jwt = require('jsonwebtoken');

//Registeration
router.post("/api/accounts", async (req, res, next) => {
    const newAccount = new Account({
      _id: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    })
    console.log(newAccount);
    try {
      var savedAccount = await newAccount.save();
      res.status(200).json({
        savedAccount,
        title: 'Signup Success' })
    } 
    catch (err) {
      return res.status(400).json({
        title: 'error',
        error: 'email in use'
      })
    }
    });

//Login
router.post('/api/accounts/login', (req, res, next) => {
    Account.findOne({ email: req.body.email }, (err, account) => {
      if (err) return res.status(500).json({
        title: 'server error',
        error: err
      })
      if (!account) {
        return res.status(401).json({
          title: 'user not found',
          error: 'invalid credentials'
        })
      }
      //incorrect password
      if (!bcrypt.compareSync(req.body.password, account.password)) {
        return res.status(401).json({
          tite: 'login failed',
          error: 'invalid password'
        })
      }
      //IF ALL IS GOOD create a token and send to frontend
      try {
      let token = jwt.sign({ accountId: account._id}, 'secretkey');
      return res.status(200).json({
        title: 'login sucess',
        token: token
      })
    } 
    catch (err) {
      return res.status(400).json({
        title: 'error',
        error: 'Unable To Login'
      })
    }
    })
  })
  
  //grabbing user info
  router.get('/api/accounts', (req, res, next) => {
    let token = req.headers.token; //token
    jwt.verify(token, 'secretkey', (err, decoded) => {
      if (err) return res.status(401).json({
        title: 'unauthorized'
      })
      //token is valid
      Account.findOne({ _id: decoded.accountId }, (err, account) => {
        if (err) return console.log(err)
        console.log(decoded)
        return res.status(200).json({
          title: 'account grabbed',
          user: {
            account
          }
        })
      })
  
    })
  })

module.exports = router;