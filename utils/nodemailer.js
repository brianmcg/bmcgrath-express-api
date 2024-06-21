const nodemailer = require('nodemailer');
const config = require('../config');
const logger = require('../utils/logger');

const { token, sender, recipient } = config.email;

const transporter = nodemailer.createTransport({
  host: 'live.smtp.mailtrap.io',
  port: 587,
  auth: { user: 'api', pass: token },
  tls: { rejectUnauthorized: false }
});

async function send({ name, address, message }) {
  logger.info(`Sending email to ${recipient}`);

  const title = `Message from ${name}`;
  const reply = `Reply to ${address}`;

	const response = await transporter.sendMail({
    from: `"Mailtrap 📧" <${sender}>`,
    to: recipient,
    subject: `Mailtrap message from ${name}`,
    text: `${title}. ${message}. ${reply}`,
    html: `
      <h1>${title}</h1>
      <p>${message}</p>
      <p>${reply}</p>
    `,
  });

  logger.info({ response });
  logger.info(`Successfully sent email to ${recipient}`);

  const [messageId] = response.messageId.replace(/[<>]/g, '').split('@');

  return { messageId };
}

module.exports = { send };
