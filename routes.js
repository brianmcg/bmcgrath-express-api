const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const router = express.Router();
const jsonParser = bodyParser.json();

const TOKEN = 'c282ddb00d4a003d89f4811f087abe03';
const HOST = 'live.smtp.mailtrap.io';
const PORT = 587;
const USER = 'api';
const SENDER = 'mailtrap@bmcgrath.net';
const RECIPIENT = 'brian.joseph.mcgrath@gmail.com';

const transporter = nodemailer.createTransport({
  host: HOST,
  port: PORT,
  auth: {
    user: USER,
    pass: TOKEN
  },
  tls: { rejectUnauthorized: false }
});

router.get('/test', (req, res) => {
  res.send('Test Successful!');
});

router.post('/send', jsonParser, async (req, res) => {
  const { name, email, message } = req.body.mail;

  try {
    const info = await transporter.sendMail({
      from: SENDER,
      to: RECIPIENT,
      subject: `Message from ${name} <${email}>`,
      text: message,
      html: `<p>name: ${name} <p>email: ${email}</p></p><p>${message}</p>`,
    });

    res.status(200).json({ messageId: info.messageId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
