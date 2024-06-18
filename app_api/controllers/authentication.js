const passport = require('passport');
const mongoose = require('mongoose');
require('../models/user');
const User = mongoose.model('User');

const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ "message": "All fields required" });
  }

  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  try {
    await user.save();
    const token = user.generateJwt();
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
};

const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ "message": "All fields required" });
  }

  passport.authenticate('local', (err, user, info) => {
    console.log('Passport authentication called'); // Debug log
    if (err) {
      console.error('Authentication error:', err);
      return res.status(404).json(err);
    }
    if (user) {
      console.log('User authenticated:', user); // Debug log
      const token = user.generateJwt();
      return res.status(200).json({ token });
    } else {
      console.log('Authentication failed:', info); // Debug log
      return res.status(401).json(info);
    }
  })(req, res);
};

module.exports = {
  register,
  login
};