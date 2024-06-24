const { MailtrapClient } = require('mailtrap');

const { token, sender, recipient } = require('../config/env');
const Logger = require('../utils/logger');
const { getTemplate } = require('../utils/handlebars');

const client = new MailtrapClient({ endpoint: 'https://send.api.mailtrap.io/', token });

async function send({ name, address, message }) {
  Logger.info(`Sending email to ${recipient}`);

  const template = await getTemplate('templates/email.hbs');

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

  Logger.info('Recieved response from mailtrap', response);

  return { id: response.message_ids[0] };
}

module.exports = { send };
