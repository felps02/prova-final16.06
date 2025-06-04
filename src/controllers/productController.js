const { Product, Category } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async findAll(req, res) {
    try {
      const products = await Product.findAll({ include: Category });
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async findById(req, res) {
    try {
      const product = await Product.findByPk(req.params.id, { include: Category });
      if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Product.update(req.body, { where: { id: req.params.id } });
      if (!updated) return res.status(404).json({ error: 'Produto não encontrado' });
      const product = await Product.findByPk(req.params.id, { include: Category });
      res.json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Product.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: 'Produto não encontrado' });
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};