const nodemailer = require('nodemailer');
const { mailtrapToken, mailtrapSender, mailtrapRecipient }  = require('../config/env');
const Logger = require('../utils/logger');
const { getTemplate } = require('../utils/handlebars');

const transporter = nodemailer.createTransport({
  host: 'live.smtp.mailtrap.io',
  port: 587,
  auth: { user: 'api', pass: mailtrapToken },
  tls: { rejectUnauthorized: true }
});

async function send({ name, address, message }) {
  Logger.info(`Sending email to ${mailtrapRecipient}`);

  const template = await getTemplate('templates/email.hbs');

  const title = `Message from ${name}`;
  const reply = `Reply to ${address}`;
  const paragraphs = message.split('\n').filter(Boolean);

	const response = await transporter.sendMail({
    from: `"Mailtrap 📧" <${mailtrapSender}>`,
    to: mailtrapRecipient,
    subject: `Mailtrap message from ${name}`,
    text: `${title}. ${message}. ${reply}`,
    html: template({ title, paragraphs, reply }),
  });

  Logger.info('Recieved nodemailer response', response);

  return { id: response.messageId.replace(/[<>]/g, '').split('@')[0] };
}

module.exports = { send };
