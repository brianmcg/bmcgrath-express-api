const { MailtrapClient } = require('mailtrap');
const config = require('../config');

const { token, sender, recipient } = config.email;

const client = new MailtrapClient({ endpoint: 'https://send.api.mailtrap.io/', token });

function send({ name, address, message }) {
  return client.send({
    from: { email: sender, name },
    to: [{ email: recipient }],
    subject: `Message from ${name} <${address}>`,
    text: message,
  });
}

module.exports = { send };
