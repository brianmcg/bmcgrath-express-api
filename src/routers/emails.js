const express = require('express');
const bodyParser = require('body-parser');
const mailtrap = require('../utils/mailtrap');
const Logger = require('../utils/logger');

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/send', jsonParser, async (req, res) => {
  try {
    const result = await mailtrap.send(req.body.email);
    res.status(200).json(result);
  } catch (error) {
    Logger.error(error.toString());
    res.status(500).json({ message: 'Failed to send email' });
  }
});

module.exports = router;
