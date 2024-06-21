const { MailtrapClient } = require('mailtrap');
const config = require('../config');
const logger = require('../utils/logger');

const { token, sender, recipient } = config.email;

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
    html: `
      <h1>${title}</h1>
      ${paragraphs.map(p => `<p>${p}</p>`).join('')}
      <h4>${reply}</4>
    `,
  });

  logger.info({ response });
  logger.info(`Successfully sent email to ${recipient}`);

  const [messageId] = response.message_ids;

  return { messageId };
}

module.exports = { send };
