const { MailtrapClient } = require('mailtrap');
const { mailtrapToken, mailtrapSender, mailtrapRecipient } = require('../config/env');
const Logger = require('../utils/logger');
const { getTemplate } = require('../utils/handlebars');

const client = new MailtrapClient({
  endpoint: 'https://send.api.mailtrap.io/',
  token: mailtrapToken,
});

async function send({ name, address, message }) {
  Logger.info(`Sending email to ${mailtrapRecipient}`);

  const template = await getTemplate('templates/email.hbs');

  const title = `Message from ${name}`;
  const reply = `Reply to ${address}`;
  const paragraphs = message.split('\n').filter(Boolean);

  const response = await client.send({
    category: process.env.NODE_ENV.toUpperCase(),
    from: { email: mailtrapSender, name: 'Mailtrap 📧' },
    to: [{ email: mailtrapRecipient }],
    subject: `Mailtrap message from ${name}`,
    text: `${title}. ${message}. ${reply}`,
    html: template({ title, paragraphs, reply }),
  });

  Logger.info('Recieved mailtrap response', response);

  return { id: response.message_ids[0] };
}

module.exports = { send };
