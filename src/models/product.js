const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./category');

const Product = sequelize.define('Product', {
  nome: DataTypes.STRING,
  preco: DataTypes.FLOAT,
});

// Associação: Um produto pertence a uma categoria
Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Product;