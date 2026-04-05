const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken")
const router = express.Router()

router.get('/',
  passport.authenticate('google', { scope: ['profile', "email"], session: false }));

router.get('/redirect', 
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  function(req, res) {
    const user = req.user;

    const token = jwt.sign(
      { id: user._id, email: user.email }, 
      process.env.SECRET, 
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,    
      secure: false,      
      maxAge: 24 * 60 * 60 * 1000 
    });

    return res.status(200).json(token)
  });

module.exports = router