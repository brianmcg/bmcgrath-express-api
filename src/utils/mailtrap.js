const { MailtrapClient } = require('mailtrap');
const { mailtrapToken, mailtrapSender, mailtrapEndpoint, emailRecipient } = require('@config/env');
const Logger = require('@utils/logger');
const { getTemplate } = require('@utils/handlebars');

const client = new MailtrapClient({
  endpoint: mailtrapEndpoint,
  token: mailtrapToken,
});

async function send({ name, address, message }) {
  Logger.info(`Sending email to ${emailRecipient} from ${mailtrapSender}`);
  Logger.info(`Sent by ${name} <${address}>`);

  const template = await getTemplate('templates/email.hbs');

  const title = `Message from ${name}`;
  const reply = `Reply to ${address}`;
  const paragraphs = message.split('\n').filter(Boolean);

  const response = await client.send({
    from: { email: mailtrapSender, name: 'Mailtrap 📧' },
    to: [{ email: emailRecipient }],
    subject: `Mailtrap message from ${name}`,
    text: `${title}. ${message}. ${reply}`,
    html: template({ title, paragraphs, reply }),
    category: process.env.NODE_ENV.toUpperCase(),
  });

  Logger.info('Recieved mailtrap response', response);

  return { id: response.message_ids[0] };
}

module.exports = { send };
