

// const bcrypt = require('bcrypt');
// const base64 = require('base-64');
// const { Users } = require('../models/index');


// async function basicAuth(req, res, next) {
//   if (!req.headers.authorization) {
//     return res.status(401).send('Unauthorized');
//   }

//   const encodedCredentials = req.headers.authorization.split(' ')[1];
//   const credentials = base64.decode(encodedCredentials);
//   const [username, password] = credentials.split(':');

//   try {
//     const user = await Users.findOne({ where: { username: username } });

//     if (!user) {
//       return res.status(401).send('Unauthorized');
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(401).send('Unauthorized');
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(500).send('Internal Server Error');
//   }
// }

// module.exports = basicAuth;
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const { User } = require('../models/index');

async function basicAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized');
  }

  const encodedCredentials = req.headers.authorization.split(' ')[1];
  const credentials = base64.decode(encodedCredentials);
  const [username, password] = credentials.split(':');

  try {
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(401).send('Unauthorized');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send('Unauthorized');
    }

    req.user = user;
    next();
  } catch (err) {
    return next(err); // Forward the error to the next error-handling middleware
  }
}

module.exports = basicAuth;
