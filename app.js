const express = require('express');
const routes = require('./routes');

const app = express();
const port = 3000;

app.use('/emails', routes);

app.get("/up", (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
