const nodemailer = require('nodemailer');
const env = require('@config/env');
const Logger = require('@utils/logger');
const { getTemplate } = require('@utils/handlebars');

const { host, user, pass, sender, recipient } = env.nodemailer;

const transporter = nodemailer.createTransport({
  host,
  port: 587,
  auth: { user, pass },
  tls: { rejectUnauthorized: false }
});

async function send({ name, address, message }) {
  Logger.info(`Send request from ${name} <${address}>`);
  Logger.info(`Sending email to ${recipient} from ${sender}`);

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
    category: process.env.NODE_ENV.toUpperCase(),
  });

  Logger.info('Recieved mailtrap response');
  Logger.info(response);

  return { id: response.messageId.replace(/[<>]/g, '').split('@')[0] };
}

module.exports = { send };
