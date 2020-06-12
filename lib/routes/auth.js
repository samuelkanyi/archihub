const express = require('express');
const router = express.Router();
const passport = require('passport');
const {users} = require('../data');
const {UserModel} = require('../models');
const bcrypt = require('bcryptjs');


//view for login page
router.get('/login', (req, res)=>{

})

router.post('/login', passport.authenticate('local'), (req, res)=>{

})


//dev purposes insert an admin
router.post('/register', (req, res)=>{
    users.forEach(user =>{
        bcrypt.hash(user.password, 10, (err, hash)=>{
            if(err) throw err;
            user.password = hash;
            console.log(user);
            new UserModel(user).save().then(val =>console.log()).catch(err=>console.error(err))
        })
    })
});

module.exports = router;