const express = require('express');
const router = express.Router();
const {
  authenticate,
  authorizeAdmin,
} = require('../middlewares/authMiddleware');
const { validateOrder } = require('../middlewares/orderMiddleware');
const { ordersController } = require('../controllers/ordersController');

router.get('/', authenticate, authorizeAdmin, ordersController.getAllOrders);
router.get('/user', authenticate, ordersController.getUserOrders);
router.get('/:orderId', ordersController.getOrderDetails);
router.post('/', authenticate, ordersController.createOrder);
router.put('/:orderId', validateOrder, ordersController.updateOrder);
router.delete(
  '/:orderId',
  authenticate,
  authorizeAdmin,
  ordersController.deleteOrder,
);

module.exports = router;
