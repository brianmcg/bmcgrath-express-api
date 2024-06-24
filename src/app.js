const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const minify = require('express-minify');
const basicAuth = require('express-basic-auth')

const { apiUser, apiPass }  = require('./config/env');
const logger = require('./utils/logger');
const emails = require('./routers/emails');

const port = 8080;
const app = express();

app.use(compression());
app.use(minify());
app.use(helmet());
app.use(cors());

app.use(basicAuth({
	users: { [apiUser]: apiPass },
	unauthorizedResponse: 'HTTP Basic: Access denied.',
}));

app.use(RateLimit({
	windowMs: 60000,
	max: 20,
}));

app.set('trust proxy', 1);

app.get('/up', (req, res) => res.send('Server is up!'));

app.use('/api/emails', emails);

app.listen(port, () => logger.info(`Server running at http://localhost:${port}`));
