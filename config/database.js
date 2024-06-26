const env = require('../src/config/env');

const { name, username, password } = env.database;

module.exports = {
  username,
  password,
  database: name,
  host: 'localhost',
  dialect: 'postgres'
};
