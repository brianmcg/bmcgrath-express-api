const { MailtrapClient } = require('mailtrap');
const env = require('../config/env');
const logger = require('../utils/logger');
const handlebars = require('../utils/handlebars');

const template = handlebars.compile('templates/email.hbs');

const { token, sender, recipient } = env.email;

const client = new MailtrapClient({ endpoint: 'https://send.api.mailtrap.io/', token });

async function send({ name, address, message }) {
  logger.info(`Sending email to ${recipient}`);

  const title = `Message from ${name}`;
  const reply = `Reply to ${address}`;
  const paragraphs = message.split('\n').filter(Boolean);

  const response = await client.send({
    from: { email: sender, name: 'Mailtrap 📧' },
    to: [{ email: recipient }],
    subject: `Mailtrap message from ${name}`,
    text: `${title}. ${message}. ${reply}`,
    html: template({ title, paragraphs, reply }),
  });

  logger.info(`Recieved response from mailtrap: ${JSON.stringify(response)}`);
  logger.info(`Successfully sent email to ${recipient}`);

  const [id] = response.message_ids;

  return { id };
}

module.exports = { send };
