const express = require('express');
const emails = require('./routes/emails');

const app = express();
const port = 8080;
const api = '/api';

const addRoutes = (path, routes) => app.use(`/api/${path}`, routes);

app.get('/up', (req, res) => {
  res.send('Server is up!');
});

addRoutes('emails', emails);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
