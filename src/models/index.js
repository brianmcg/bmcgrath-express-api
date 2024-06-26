const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const { database, username, password, ...config } = require(__dirname + '/../../config/database');

const db = new Sequelize(database, username, password, {
  ...config,
  define: { underscored: true },
});

const models = fs.readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' &&
    file.indexOf('.test.js') === -1
  ))
  .reduce((memo, file) => {
    const Model = require(path.join(__dirname, file));
    const model = Model(db, Sequelize.DataTypes);
    return { [model.name]: model };
  }, {});

Object.keys(models).forEach(name => {
  if (models[name].associate) {
    models[name].associate(models);
  }
});

(async () => {
  try {
    db.authenticate();
    console.info('Connection to database established.');
  } catch (error) {
    console.error(`Unable to connect to the database: ${error.toString()}.`);
  }
})();

module.exports = models;
