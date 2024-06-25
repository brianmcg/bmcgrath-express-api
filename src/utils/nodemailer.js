const nodemailer = require('nodemailer');
const { nodemailerHost, nodemailerUser, nodemailerPass, mailtrapSender, emailRecipient }  = require('@config/env');
const Logger = require('@utils/logger');
const { getTemplate } = require('@utils/handlebars');

const transporter = nodemailer.createTransport({
  host: nodemailerHost,
  port: 587,
  auth: { user: nodemailerUser, pass: nodemailerPass },
  tls: { rejectUnauthorized: false }
});


async function send({ name, address, message }) {
  Logger.info(`Sending email to ${emailRecipient} from ${mailtrapSender}`);
  Logger.info(`Sent by ${name} <${address}>`);

  const template = await getTemplate('templates/email.hbs');

  const title = `Message from ${name}`;
  const reply = `Reply to ${address}`;
  const paragraphs = message.split('\n').filter(Boolean);

	const response = await transporter.sendMail({
    from: `"Mailtrap 📧" <${mailtrapSender}>`,
    to: emailRecipient,
    subject: `Mailtrap message from ${name}`,
    text: `${title}. ${message}. ${reply}`,
    html: template({ title, paragraphs, reply }),
    category: process.env.NODE_ENV.toUpperCase(),
  });

  Logger.info('Recieved nodemailer response', response);

  return { id: response.messageId.replace(/[<>]/g, '').split('@')[0] };
}

module.exports = { send };
