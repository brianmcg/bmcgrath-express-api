module.exports = (sequelize, DataTypes) => sequelize.define('Post', {
  name: DataTypes.STRING,
  address: DataTypes.STRING,
  message: DataTypes.STRING,
});
