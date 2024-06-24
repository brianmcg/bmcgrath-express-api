const express = require('express');
// const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const minify = require('express-minify');

const Logger = require('./utils/logger');
const auth = require('./utils/auth');
const apiRouter = require('./routers/api');

const port = 8080;
const app = express();

app.use(auth.basic);
app.use(compression());
app.use(minify());
app.use(helmet());
// app.use(cors());
app.use(RateLimit({ windowMs: 60000, max: 20 }));
app.set('trust proxy', 1);

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://www.bmcgrath.net"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

app.get('/up', (req, res) => res.send('Server is up!'));

app.use('/api', apiRouter);

app.listen(port, () => Logger.info(`Server running at http://localhost:${port}`));
