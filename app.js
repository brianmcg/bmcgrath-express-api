const express = require('express');
const cors = require('cors');
const logger = require('./utils/logger');
const auth = require('./utils/auth');
const emails = require('./routes/emails');

const port = 8080;

const app = express();

const addApiRoute = (path, routes) => app.use(`/api/${path}`, routes);

app.use(cors());

app.use(auth.basic);

app.get('/up', (req, res) => res.send('Server is up!'));

addApiRoute('emails', emails);

app.listen(port, () => logger.info(`Server running at http://localhost:${port}`));
