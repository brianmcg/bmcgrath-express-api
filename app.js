const express = require('express');
const cors = require('cors');
const auth = require('./auth');
const emails = require('./routes/emails');

const app = express();
const port = 8080;

const addRoute = (path, routes) => app.use(`/api/${path}`, routes);

app.use(cors());
app.use(auth.basic);

app.get('/up', (req, res) => {
  res.send('Server is up!');
});

addRoute('emails', emails);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
