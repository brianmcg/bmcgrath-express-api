const { MailtrapClient } = require('mailtrap');
const env = require('@config/env');
const Logger = require('@utils/logger');
const { getTemplate } = require('@utils/handlebars');

const { token, sender, endpoint, recipient } = env.mailtrap;

const client = new MailtrapClient({ endpoint, token });

async function send({ name, address, message }) {
  Logger.info(`Send request from ${name} <${address}>`);
  Logger.info(`Sending email to ${recipient} from ${sender}`);

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
    category: process.env.NODE_ENV.toUpperCase(),
  });

  Logger.info('Recieved mailtrap response');
  Logger.info(response);

  return { id: response.message_ids[0] };
}

module.exports = { send };
