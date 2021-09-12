const express = require('express');
const User = require('../models/User');
var bcrypt = require('bcryptjs');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
//string to sign token.
const jwtstring="jsonwebtoken";


// 1:Create a User using: POST "/api/auth/createuser". No login required.
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "please try with correct email or password" })
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);

       // Create a new user
    user = await User.create({
        name: req.body.name,
        password: hash,
        email: req.body.email,
      })
      const data={
        user:{
           id:user.id
        }
      }
      const authtoken = jwt.sign(data,jwtstring);
      res.json({authtoken})
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }
  })



  // 2:login a User using: POST "/api/auth/login". No login required.
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'password cannot be blank').exists(),
], async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password} =req.body;
  // Check whether the user with this email or password exists already
  try {
    let user=await User.findOne({email});
    if (!user) {
      return res.status(400).json({ error: "please try with correct email or password" });
    }
    const compare=await bcrypt.compare(password,user.password);
    if(!compare){
      return res.status(400).json({ error: "please try with correct email or password" });
    }
    const data={
      user:{
         id:user.id
      }
    }
    const authtoken = jwt.sign(data,jwtstring);
    res.json({authtoken})
    
  }catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error occured");
  }
})
  module.exports = router 