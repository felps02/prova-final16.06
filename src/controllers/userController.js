const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const JWT_SECRET = 'sua_chave_secreta'; 

class UserController {
  constructor() {
  }
  async create(req, res) {
    try {
      // Criptografa a senha antes de salvar
      const hash = await bcrypt.hash(req.body.senha, 10);
      const user = await User.create({ ...req.body, senha: hash });
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  async findAll(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async findById(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      // Se for atualizar a senha, criptografa novamente
      if (req.body.senha) {
        req.body.senha = await bcrypt.hash(req.body.senha, 10);
      }
      const [updated] = await User.update(req.body, { where: { id: req.params.id } });
      if (!updated) return res.status(404).json({ error: 'Usuário não encontrado' });
      const user = await User.findByPk(req.params.id);
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await User.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async login(req, res) {
    const { email, senha } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }
    // Compara a senha informada com o hash salvo
    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  }
};

module.exports = new UserController();