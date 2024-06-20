const { MailtrapClient } = require('mailtrap');
const config = require('../config');

const { token, sender, recipient } = config.email;

const client = new MailtrapClient({ endpoint: 'https://send.api.mailtrap.io/', token });

async function send({ name, address, message }) {
  const response = await client.send({
    from: { email: sender, name },
    to: [{ email: recipient }],
    subject: `Message from ${name} <${address}>`,
    text: message,
  });

  const [messageId] = response.message_ids;

  return { success: true, messageId };
}

module.exports = { send };
