const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

// deixar /order como base para as rotas de pedido

router.post('/order', orderController.createOrder);
router.get('/order/:id', orderController.getOrder);
router.get('/order/list', orderController.getAllOrders);
router.patch('/order/:id', orderController.updateOrder);
router.delete('/order/:id', orderController.deleteOrder);

module.exports = router;