const config = require('./config');

const { apiUser, apiPass } = config.email;

function basic(req, res, next) {
  const authheader = req.headers.authorization;

  console.log(authheader);

  if (!authheader) {
    const err = new Error('You are not authenticated');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err)
  }

  // Basic Yjk0ZTNkNDIwNGU0M2E3YjNiNzExNmU4ZjJlMTY2NDY6YmM3NmFhMmQ2ZWViM2UyYmUxYzNlMzk5OGI1OWE1YzA=

  const auth = new Buffer.from(authheader.split(' ')[1], 'base64').toString().split(':');
  const user = auth[0];
  const pass = auth[1];

  if (user === apiUser && pass === apiPass) {
    next();
  } else {
    const err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }
}

module.exports = { basic };
