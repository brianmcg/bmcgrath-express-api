const express = require('express');
const emailController = require('./controllers/emails');

const app = express();
const port = 8080;
const api = '/api';

const addController = (path, controller) => {
  app.use(`/api/${path}`, emailController);
};

app.get('/up', (req, res) => {
  res.send('Server is up!');
});

addController('emails', emailController);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
