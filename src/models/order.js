const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Product = require('./product');
const ProductOrder = require('./productorder');

const Order = sequelize.define('Order', {
  status: {
    type: DataTypes.STRING,
    defaultValue: 'ativo'
  },
});


Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsToMany(Product, { through: ProductOrder, as: 'products' });
Product.belongsToMany(Order, { through: ProductOrder, as: 'orders' });

module.exports = Order;