
// const base64 = require('base-64');
// const bcrypt = require('bcrypt');
// const { User } = require('../models/index');

// async function basicAuth(req, res, next) {
//   if (!req.headers.authorization) {
//     return res.status(401).send('Unauthorized');
//   }

//   const encodedCredentials = req.headers.authorization.split(' ')[1];
//   const credentials = base64.decode(encodedCredentials);
//   const [N, password] = credentials.split(':');

//   try {
//     const user = await User.findOne({ where: { username: username } });

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
//     return next(err); // Forward the error to the next error-handling middleware
//   }
// }

// module.exports = basicAuth;


// 'use strict';
// const bcrypt = require('bcrypt');
// const base64 = require('base-64');
// const { userTable } = require('../models');
//     async function basicAuthMiddleWare(req, res, next){
//     if(req.headers.authorization){
//       const basicHeaderParts = req.headers.authorization.split(' ');
//       const encodedValues= basicHeaderParts.pop();
//       const decodedValues = base64.decode(encodedValues);
//       const [userName, password] = decodedValues.split(':');
//       const user = await userTable.findOne({ where: { userName } });
//       const isValid = await bcrypt.compare(password, user.password);
//       if (isValid) {
//         req.user = user;
//         next();
//       }
//       else {
//         res.status(401).send('Invalid password');
//         throw new Error('this user is invalid');
//       }
//   }}
//   module.exports = basicAuthMiddleWare;

'use strict';
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { userTable } = require('../models');

async function basicAuthMiddleWare(req, res, next) {
  if (req.headers.authorization) {
    const basicHeaderParts = req.headers.authorization.split(' ');
    if (basicHeaderParts.length !== 2 || basicHeaderParts[0] !== 'Basic') {
      res.status(401).send('Invalid authorization header');
      return;
    }

    const encodedValues = basicHeaderParts[1];
    const decodedValues = base64.decode(encodedValues);
    const [userName, password] = decodedValues.split(':');

    try {
      const user = await userTable.findOne({ where: { userName } });

      if (!user) {
        res.status(401).send('User not found');
        return;
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        res.status(401).send('Invalid password');
        return;
      }

      // If the user and password are valid, attach the user to the request for later use
      req.user = user;
      next();
    } catch (error) {
      console.error('Error while authenticating user:', error);
      res.status(500).send('Internal server error');
    }
  } else {
    res.status(401).send('Authorization header not provided');
  }
}

module.exports = basicAuthMiddleWare;
