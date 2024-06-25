const dotenv = require('dotenv');

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = {
  mailtrapToken: process.env.MAILTRAP_TOKEN,
  mailtrapEndpoint: process.env.MAILTRAP_ENDPOINT,
  mailtrapSender: process.env.MAILTRAP_SENDER,
  nodemailerHost: process.env.NODEMAILER_HOST,
  nodemailerUser: process.env.NODEMAILER_USER,
  nodemailerPass: process.env.NODEMAILER_PASS,
  emailRecipient: process.env.EMAIL_RECIPIENT,
  apiUser: process.env.API_USER,
  apiPass: process.env.API_PASS,
};
