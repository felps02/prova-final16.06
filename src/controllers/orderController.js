const { Order, User, Product } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const { userId, products } = req.body;
      const order = await Order.create({ userId });

      // associa o produto ao pedido com quantidade 
      for (const item of products) {
        const product = await Product.findByPk(item.productId);
        if (product) {
          await order.addProduct(product, { through: { quantidade: item.quantidade } });
        }
      }

      res.status(201).json(order);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async findAll(req, res) {
    try {
      const orders = await Order.findAll({ include: [User, { model: Product, as: 'products' }] });
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async findById(req, res) {
    try {
      const order = await Order.findByPk(req.params.id, { include: [User, { model: Product, as: 'products' }] });
      if (!order) return res.status(404).json({ error: 'Pedido não encontrado' });
      res.json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Order.update(req.body, { where: { id: req.params.id } });
      if (!updated) return res.status(404).json({ error: 'Pedido não encontrado' });
      const order = await Order.findByPk(req.params.id, { include: [User, { model: Product, as: 'products' }] });
      if (req.body.products) {
        await order.setProducts(req.body.products);
      }
      res.json(order);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Order.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: 'Pedido não encontrado' });
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};