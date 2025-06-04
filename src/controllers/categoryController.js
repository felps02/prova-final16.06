const { Category } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const category = await Category.create(req.body);
      res.status(201).json(category);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async findAll(req, res) {
    try {
      const categories = await Category.findAll();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async findById(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) return res.status(404).json({ error: 'Categoria não encontrada' });
      res.json(category);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Category.update(req.body, { where: { id: req.params.id } });
      if (!updated) return res.status(404).json({ error: 'Categoria não encontrada' });
      const category = await Category.findByPk(req.params.id);
      res.json(category);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Category.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: 'Categoria não encontrada' });
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};