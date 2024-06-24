const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const minify = require('express-minify');
const basicAuth = require('express-basic-auth')

const { apiUser, apiPass }  = require('./config/env');
const logger = require('./utils/logger');
const apiRouter = require('./routers/api');

const port = 8080;
const app = express();

app.use(compression());
app.use(minify());
app.use(helmet());

// Must be before basicAuth to work.
app.use(cors());

app.use(basicAuth({
  users: { [apiUser]: apiPass },
  unauthorizedResponse: 'HTTP Basic: Access denied.',
}));

app.use(RateLimit({
  windowMs: 60000,
  max: 20,
}));

app.use('/api', apiRouter);

app.set('trust proxy', 1);

app.get('/up', (req, res) => res.send('Server is up!'));

app.listen(port, () => logger.info(`Server running at http://localhost:${port}`));
