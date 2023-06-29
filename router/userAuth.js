const express = require("express");
const router = express.Router();
const { User, validate } = require("../module/userAuthModule");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/authTest")
  .then((res) => {
    console.log("db connected successfully");
  })
  .catch((er) => {
    console.log(er);
  });

router.post("/", async (req, res) => {
  const error = validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("This user is already exist");
  } else {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const userData = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password,
    });
    const token=jwt.sign({_id:userData._id},'privateKey')
    console.log('token',token)
    const result=await userData.save();
    res.send(result);
  }

  return res.status(200).send("success");
});

router.get("/l", async (req, res) => {
  const error = req.body.email.length > 0;
  if (!error) {
    return res.status(400).send(error);
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid Email or Password");
  }

  const validatePwd = await bcrypt.compare(req.body.password, user.password);
  if (!validatePwd) return res.status(400).send("Invalid Password");

  return res.status(200).send("success");
});
module.exports = router;
