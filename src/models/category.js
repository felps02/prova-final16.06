const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
  nome: DataTypes.STRING,
});

module.exports = Category;