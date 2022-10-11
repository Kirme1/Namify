const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const Account = require("../schema/Account")
const jwt = require('jsonwebtoken');

//Registeration
router.post("/api/accounts", async (req, res, next) => {
    const newAccount = new Account({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    })
    console.log(newAccount);
    try {
      var savedAccount = await newAccount.save();
      res.status(201).json({
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
      console.log(req.body.password)
      console.log(account.password)
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

  //verify account password
  router.get('/api/accounts/verify', (req, res) => {
    let password = req.headers.password
    let email = req.headers.email
    Account.findOne({ email: email }, (err, account) => {
      if (err) return res.status(500).json({
        title: 'server error',
        error: err
      })
      console.log(password)
      console.log(account.password)
      if (!bcrypt.compareSync(password, account.password)) {
        return res.status(401).json({
          valid: false,
          error: 'invalid password'
        })
      }
      return res.status(201).json({
        valid: true,
      })
  })
})

  module.export = (req, res, next) => {
    const accountToken = req.headers.token;

    if(accountToken === null) {
      return res.status(401).json({ error: "User not authenticated"});
    }

    try {
      const decodedToken = jwt.verify(accountToken, 'secretkey');
      if (decoded) {
        req.authenticated = true;
        req.userData = decoded;
        return next();
      } else {
        return res.status(401).json({ error: 'Invalid token'});
      }
    } catch (err) {
      return res.status(401).json({ error: 'could not verify token'})
    }
  }

module.exports = router;