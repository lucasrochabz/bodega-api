const express = require('express');
const router = express.Router();
const { ordersController } = require('../controllers/ordersController');

router.get('/', ordersController.lisAllOrders);
router.get('/:orderId', ordersController.getOrder);
router.post('/', ordersController.createOrder);
router.put('/:orderId', ordersController.updateOrder);
router.delete('/:orderId', ordersController.deleteOrder);

module.exports = router;
