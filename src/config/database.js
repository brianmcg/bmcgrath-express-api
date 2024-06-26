const { Sequelize } = require('sequelize');
const env = require('@config/env');
const Logger = require('@utils/logger');

const { name, user, password } = env.database;

const db = new Sequelize(name, user, password, {
  host: 'localhost',
  dialect: 'postgres',
});

db.authenticate().then(
  () => Logger.info('Connection to database has been established successfully.'),
  error => Logger.error(`Unable to connect to the database: ${error.toString()}`),
);

module.exports = db;
