const Users = require('../models/users-model');

async function basicAuth(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    res.status(401).json({ message: 'Authorization header is missing' });
    return;
  }

  const encodedCredentials = authorizationHeader.split(' ')[1];
  const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString();
  const [username, password] = decodedCredentials.split(':');

  try {
    const user = await Users.findOne({ where: { username } });

    if (!user || !(await user.authenticate(password))) {
      res.status(401).json({ message: 'Invalid Login' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = basicAuth;
