/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: CRUD de pedidos
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               total:
 *                 type: number
 *     responses:
 *       201:
 *         description: Pedido criado
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Busca pedido por ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado
 *   put:
 *     summary: Atualiza pedido por ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               total:
 *                 type: number
 *     responses:
 *       200:
 *         description: Pedido atualizado
 *   delete:
 *     summary: Remove pedido por ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Pedido removido
 */

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');




router.post('/', orderController.create);
router.get('/', orderController.findAll);
router.get('/:id', orderController.findById);
router.put('/:id', orderController.update);
router.delete('/:id', orderController.delete);

module.exports = router;
