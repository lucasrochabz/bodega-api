const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { ordersController } = require('../controllers/ordersController');

router.get('/', ordersController.getAllOrders);
router.get('/user', authenticate, ordersController.getUserOrders);
router.get('/:orderId', ordersController.getOrderDetails);
router.post('/', authenticate, ordersController.createOrder);
router.put('/:orderId', ordersController.updateOrder);
router.delete('/:orderId', ordersController.deleteOrder);

module.exports = router;
