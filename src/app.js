const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const minify = require('express-minify');
const basicAuth = require('express-basic-auth')

const { apiUser, apiPass }  = require('./config/env');
const Logger = require('./utils/logger');
const apiRouter = require('./routers/api');

const port = 8080;

const app = express();

const rateLimitOptions = { windowMs: 60000, max: 20 };

const basicAuthOptions = {
  users: { [apiUser]: apiPass },
  unauthorizedResponse: 'HTTP Basic: Access denied.',
};

const corsOptions = {
  origin: ['https://www.bmcgrath.net'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(basicAuth(basicAuthOptions));
app.use(RateLimit(rateLimitOptions));

app.use(compression());
app.use(minify());
app.use(helmet());

app.use('/api', apiRouter);

app.set('trust proxy', 1);

app.get('/up', (req, res) => res.send('Server is up!'));

app.listen(port, () => Logger.info(`Server running at http://localhost:${port}`));
