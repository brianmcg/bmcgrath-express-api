const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  mail: {
    pass: process.env.MAIL_TOKEN,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_USER,
    sender: process.env.MAIL_SENDER,
    recipient: process.env.RECIPIENT,
  }
};
