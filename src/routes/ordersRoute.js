const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authsMiddlewares');
const { ordersController } = require('../controllers/ordersController');

router.get('/', ordersController.listAllOrders);
router.get('/user', authenticate, ordersController.getAllOrdersUser);
router.get('/details/:orderId', ordersController.getOrder);
router.post('/', authenticate, ordersController.createOrder);
router.put('/:orderId', ordersController.updateOrder);
router.delete('/:orderId', ordersController.deleteOrder);

module.exports = router;
