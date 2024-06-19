const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const config = require('../config');

const router = express.Router();
const jsonParser = bodyParser.json();
const { pass, host, port, user, sender, recipient } = config.mail;

const transporter = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass },
  tls: { rejectUnauthorized: false }
});

router.post('/send', jsonParser, async (req, res) => {
  try {
    const { name, address, message } = req.body.email;

    const info = await transporter.sendMail({
      from: sender,
      to: recipient,
      subject: `Message from ${name} <${address}>`,
      text: message,
      html: `<p>name: ${name} <p>email: ${address}</p></p><p>${message}</p>`,
    });

    res.status(200).json({ messageId: info.messageId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
