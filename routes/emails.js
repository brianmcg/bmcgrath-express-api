const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('../utils/nodemailer');
const logger = require('../utils/logger');

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/send', jsonParser, async (req, res) => {
  try {
    const result = await nodemailer.send(req.body.email);
    logger.info(result);
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

module.exports = router;
