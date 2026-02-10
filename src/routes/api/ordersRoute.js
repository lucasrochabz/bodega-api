import express from 'express';
import {
  authenticateUser,
  authorizeAdmin,
} from '../../middlewares/authMiddleware.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { orderSchema } from '../../schemas/orders/orderSchema.js';
import { ordersController } from '../../controllers/ordersController.js';

const router = express.Router();

router.get(
  '/',
  authenticateUser,
  authorizeAdmin,
  ordersController.getAllOrders,
);
router.get('/me', authenticateUser, ordersController.getMyOrders);
router.get('/:orderId', authenticateUser, ordersController.getOrderDetails);

// fix: add schema
router.post('/', authenticateUser, ordersController.createOrder);

// fix: proteger essa rota
// fix: acho que essa rota tem que ir para paymentsController
// fix: ver como posso esta utilizando essa rota
router.patch(
  '/:orderId',
  validateBody(orderSchema),
  ordersController.updateOrder,
);

router.delete(
  '/:orderId',
  authenticateUser,
  authorizeAdmin,
  ordersController.deleteOrder,
);

export default router;
