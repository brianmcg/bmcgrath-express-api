const express = require('express');
const emails = require('./routes/emails');
const auth = require('./auth');

const app = express();
const port = 8080;

const addRoutes = (path, routes) => app.use(`/api/${path}`, routes);

// app.use(auth.basic);

app.get('/up', (req, res) => {
  res.send('Server is up!');
});

addRoutes('emails', emails);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
