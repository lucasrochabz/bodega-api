const express = require('express');
const router = express.Router();
const { ordersController } = require('../controllers/ordersController');

router.get('/', ordersController.lisAllOrders);
router.get('/:orderId', ordersController.getOrder);
router.post('/', ordersController.createOrder);

module.exports = router;
