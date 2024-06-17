const express = require('express');
const routes = require('./routes');

const app = express();
const port = 80;

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
