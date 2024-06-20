const config = require('./config');

const { apiUser, apiPass } = config.email;

function basic(req, res, next) {
  const authheader = req.headers.authorization;

  if (!authheader) {
    const err = new Error('You are not authenticated');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err)
  }

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
