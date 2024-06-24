const nodemailer = require('nodemailer');
const { token, sender, recipient }  = require('../config/env');
const logger = require('../utils/logger');
const { getTemplate } = require('../utils/handlebars');

const transporter = nodemailer.createTransport({
  host: 'live.smtp.mailtrap.io',
  port: 587,
  auth: { user: 'api', pass: token },
  tls: { rejectUnauthorized: false }
});

async function send({ name, address, message }) {
  logger.info(`Sending email to ${recipient}`);

  const template = await getTemplate('templates/email.hbs');

  const title = `Message from ${name}`;
  const reply = `Reply to ${address}`;
  const paragraphs = message.split('\n').filter(Boolean);

	const response = await transporter.sendMail({
    from: `"Mailtrap 📧" <${sender}>`,
    to: recipient,
    subject: `Mailtrap message from ${name}`,
    text: `${title}. ${message}. ${reply}`,
    html: template({ title, paragraphs, reply }),
  });

  logger.info('Recieved response from nodemailer', response);

  return { id: response.messageId.replace(/[<>]/g, '').split('@')[0] };
}

module.exports = { send };
