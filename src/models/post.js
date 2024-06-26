module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Post', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    message: DataTypes.STRING,
  }, {
    sequelize
  });
};
