const dotenv = require('dotenv');

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

module.exports = {
  mailtrap: {
    token: process.env.MAILTRAP_TOKEN,
    endpoint: process.env.MAILTRAP_ENDPOINT,
    sender: process.env.MAILTRAP_SENDER,
    recipient: process.env.EMAIL_RECIPIENT,
  },
  nodemailer: {
    host: process.env.NODEMAILER_HOST,
    user: process.env.NODEMAILER_USER,
    pass: process.env.MAILTRAP_TOKEN,
    recipient: process.env.EMAIL_RECIPIENT,
    sender: process.env.MAILTRAP_SENDER,
  },
  api: {
    user: process.env.API_USER,
    password: process.env.API_PASS,
  },
  database: {
    name: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  }
};
