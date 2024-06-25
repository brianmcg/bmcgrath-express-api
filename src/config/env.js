const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  mailtrapToken: process.env.MAILTRAP_TOKEN,
  mailtrapSender: process.env.MAILTRAP_SENDER,
  mailtrapRecipient: process.env.MAILTRAP_RECIPIENT,
  apiUser: process.env.API_USER,
  apiPass: process.env.API_PASS,
};
