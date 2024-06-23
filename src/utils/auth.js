const env = require('../config/env');

const { apiUser, apiPass } = env.email;

function basic(req, res, next) {
  const authheader = req.headers.authorization;

  if (!authheader) {
    return res.status(401).send('HTTP Basic: Access denied.');
  }

  const [user, pass] = new Buffer.from(authheader.split(' ')[1], 'base64').toString().split(':');

  if (user === apiUser && pass === apiPass) {
    return next();
  } else {
    return res.status(401).send('HTTP Basic: Access denied.');
  }
}

module.exports = { basic };
