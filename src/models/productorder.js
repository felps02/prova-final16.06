const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductOrder = sequelize.define('ProductOrder', {
  quantidade: DataTypes.INTEGER,
});


module.exports = ProductOrder;