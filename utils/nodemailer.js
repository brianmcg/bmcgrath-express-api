const nodemailer = require('nodemailer');
const config = require('../config');

const { token, sender, recipient } = config.email;

const transporter = nodemailer.createTransport({
  host: 'live.smtp.mailtrap.io',
  port: 587,
  auth: { user: 'api', pass: token },
  tls: { rejectUnauthorized: false }
});

function send({ name, address, message }) {
	return transporter.sendMail({
    from: sender,
    to: recipient,
    subject: `Message from ${name} <${address}>`,
    text: message,
    html: `<p>name: ${name} <p>email: ${address}</p></p><p>${message}</p>`,
  });
}

module.exports = { send };
