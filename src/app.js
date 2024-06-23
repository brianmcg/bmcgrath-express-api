const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const minify = require('express-minify');

const logger = require('./utils/logger');
const auth = require('./utils/auth');
const apiRouter = require('./routers/api');

const port = 8080;
const app = express();

app.use(compression());
app.use(minify());
app.use(helmet());
app.use(cors());
app.use(auth.basic);
app.use(RateLimit({ windowMs: 60000, max: 20 }));
app.set('trust proxy', 1);

app.get('/up', (req, res) => res.send('Server is up and running!'));

app.use('/api', apiRouter);

app.listen(port, () => logger.info(`Server running at http://localhost:${port}`));
