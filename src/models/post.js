const { DataTypes } = require('sequelize');
const db = require('@config/database');

const Post = db.define('Post', {
  name: DataTypes.STRING,
  address: DataTypes.STRING,
  message: DataTypes.STRING,
});

module.exports = Post;
