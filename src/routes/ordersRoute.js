const express = require('express');
const router = express.Router();
const { ordersController } = require('../controllers/ordersController');
const authenticate = require('../middlewares/usersMiddlewares');

router.get('/', ordersController.listAllOrders);
router.get('/user', authenticate, ordersController.getAllOrdersUser);
router.get('/details/:orderId', ordersController.getOrder);
router.post('/', ordersController.createOrder);
router.put('/:orderId', ordersController.updateOrder);
router.delete('/:orderId', ordersController.deleteOrder);

module.exports = router;
