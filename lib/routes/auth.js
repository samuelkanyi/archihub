const express = require("express");
const router = express.Router();
const { users } = require("../data");
const { UserModel } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const session = require('express-session')

//view for login page
router.get("/login", (req, res) => res.render("login"));

router.post("/login", async (req, res) => {


  const user = await UserModel.findOne({
    where: {
      username: req.body.username,
    },
  });
  //if no user is found
  if (!user) {
    return res.status(404).redirect('/auth/login');
  }
  const crypt = await bcrypt.compare(req.body.password, user.password);

  if (crypt == false) {
    return res.status(401).redirect('/auth/login');
  }

  //we have the user so we create a jwt sign-in
  const token = jwt.sign({ email: user.email }, process.env.SECRET);

  req.session.token = token
  res.redirect('/admin');
});

//dev purposes insert an admin
router.post("/register", (req, res) => {
  users.forEach((user) => {
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      console.log(user);
      new UserModel(user)
        .save()
        .then((val) => console.log())
        .catch((err) => console.error(err));
    });
  });
});

module.exports = router;
