const ProductOrder = require('../models/productorder');
const Product = require('../models/product');
const Order = require('../models/order');

module.exports = {
  async create(req, res) {
    try {
      const { orderId, productId, quantidade } = req.body;

    
      const order = await Order.findByPk(orderId);
      const product = await Product.findByPk(productId);

      if (!order || !product) {
        return res.status(404).json({ error: 'Pedido ou produto não encontrado.' });
      }

      const productOrder = await ProductOrder.create({ OrderId: orderId, ProductId: productId, quantidade });
      res.status(201).json(productOrder);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async findAll(req, res) {
    try {
      const productOrders = await ProductOrder.findAll();
      res.json(productOrders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async findById(req, res) {
    try {
      const productOrder = await ProductOrder.findByPk(req.params.id);
      if (!productOrder) {
        return res.status(404).json({ error: 'Relação produto-pedido não encontrada.' });
      }
      res.json(productOrder);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await ProductOrder.update(req.body, { where: { id: req.params.id } });
      if (!updated) {
        return res.status(404).json({ error: 'Relação produto-pedido não encontrada.' });
      }
      const productOrder = await ProductOrder.findByPk(req.params.id);
      res.json(productOrder);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await ProductOrder.destroy({ where: { id: req.params.id } });
      if (!deleted) {
        return res.status(404).json({ error: 'Relação produto-pedido não encontrada.' });
      }
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};