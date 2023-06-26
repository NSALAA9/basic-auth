const express = require('express');
const Users = require('./models/users-model');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.create({ username, password });
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
