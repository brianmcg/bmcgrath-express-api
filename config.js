const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  email: {
    token: process.env.MAILTRAP_TOKEN,
    sender: process.env.MAILTRAP_SENDER,
    recipient: process.env.EMAIL_RECIPIENT,
  }
};




