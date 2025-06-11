/**
 * @swagger
 * /register:
 *   post:
 *     summary: Cria um novo usuário (registro)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Dados inválidos
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



router.post('/', userController.create);

module.exports = router;