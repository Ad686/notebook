const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User')
var fetchuser = require('../middleware/fetchuser');
// router.post('/createuser',[
//     body('name').isLength({ min: 5 }),
//     body('email').isEmail(),
//     body('password').isLength({ min: 5 }),
// ],async(req,res)=>{
//     //if there are errors,return bad requests and the error

//    const errors = validationResult(req);
//    if (!errors.isEmpty()) {
//      return res.status(400).json({ errors: errors.array() });
//    }
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'yo@yo'

//crearting a user post('/createuser')
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
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        // check whether user exist
        // let user =  await User.findone({email: req.body.email});
        // if(user){
        //     return res.status(400).json({error:"User already exists"});
        // }

        //   user=await User.create({
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: req.body.password,
        //   })
        // //   .then(user => res.json(user))
        // //   .catch(err=>{console.log(err)
        // //     res.json({error:'please enter a unique value',message:err.message})})
        // res.json(user);

        // })
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            password: secPass,
            // password: req.body.password,
            email: req.body.email,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        //   console.log(jwtData)
        
        res.json({ authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})

// Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    
    let success=false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

   });


// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
 
  module.exports = router