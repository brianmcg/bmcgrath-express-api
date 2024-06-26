const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const { database, username, password, ...config } = require(__dirname + '/../../config/database');

const db = {};

const sequelize = new Sequelize(database, username, password, config);
// sequelize = new Sequelize(process.env[config.use_env_variable], config);

sequelize.authenticate().then(
  () => console.info('Connection to database has been established successfully.'),
  error => console.error(`Unable to connect to the database: ${error.toString()}.`),
);

fs.readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' &&
    file.indexOf('.test.js') === -1
  ))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
