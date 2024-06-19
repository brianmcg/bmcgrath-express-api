const express = require('express');
const routes = require('./routes');

const app = express();
const port = 3000;

app.use('/emails', routes);

app.get('/up', (req, res) => {
  res.send('Server is up!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
