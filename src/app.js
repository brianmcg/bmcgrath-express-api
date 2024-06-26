require('module-alias/register');

const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const minify = require('express-minify');
const basicAuth = require('express-basic-auth')
const { rateLimit } = require('express-rate-limit');

const env  = require('./config/env');
const db = require('./config/database');
const apiRouter = require('./routers/api');
const Logger = require('./utils/logger');

const { user, password } = env.api;

const port = 8080;

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://www.bmcgrath.net',
  ],
};

const basicAuthOptions = {
  users: { [user]: password },
  unauthorizedResponse: 'HTTP Basic: Access denied.',
};

const rateLimitOptions = {
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
};

app.use(cors(corsOptions));
app.use(basicAuth(basicAuthOptions));
app.use(rateLimit(rateLimitOptions));
app.use(helmet());
app.use(compression());
app.use(minify());

app.use('/api', apiRouter);

app.set('trust proxy', 1);

app.get('/up', (req, res) => res.send('Server is up!'));

app.listen(port, () => Logger.info(`Running in ${process.env.NODE_ENV} mode at port ${port}.`));
