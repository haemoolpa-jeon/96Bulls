const express = require('express');
const mongoose = require('mongoose');
const User = require('../DB/User');
const router = express.Router();

router.post('/',  async (req, res) => {
  const { username, password } = req.body;
  let user = {username, password};
  let userModel = new User(user);
  await userModel.save();
})

module.exports = router;