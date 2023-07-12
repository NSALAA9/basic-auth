// const express = require('express');
// const basicAuthMiddleware = require('./middleware/basic');
// const bcrypt = require('bcrypt');
// const router = express.Router();
// const User  = require('./models/users-model')

// router.post('/signup', userSignUp);
// router.post('/signin', basicAuthMiddleware, userSignIn);

// async function userSignUp(req, res) {
//   const { userName, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 5);
//   const newUser = await User.create({
//     userName: userName,
//     password: hashedPassword
//   });
//   res.status(201).json(newUser);
// }

// function userSignIn(req, res) {
//   res.status(200).json({
//     user: req.user
//   });
// }

// module.exports = router;

const express = require('express');
const basicAuthMiddleware = require('./middleware/basic');
const bcrypt = require('bcrypt');
const router = express.Router();
const { User } = require('./models/index'); // Update the import statement

router.post('/signup', userSignUp);
router.post('/signin', basicAuthMiddleware, userSignIn);

async function userSignUp(req, res) {
  const { userName, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 5);
  try {
    const newUser = await User.create({
      userName: userName,
      password: hashedPassword
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

function userSignIn(req, res) {
  res.status(200).json({
    user: req.user
  });
}

module.exports = router;
