import express from 'express';
import {
  authenticateUser,
  authorizeAdmin,
} from '../middlewares/authMiddleware.js';
import { validateBody } from '../middlewares/validateBody.js';
import { orderSchema } from '../schemas/orders/orderSchema.js';
import { ordersController } from '../controllers/ordersController.js';

const router = express.Router();

router.get(
  '/',
  authenticateUser,
  authorizeAdmin,
  ordersController.getAllOrders,
);

// fix: transformar rota em /user/:id ou /user/me
router.get('/user', authenticateUser, ordersController.getUserOrders);

// fix: proteger essa rota
router.get('/:orderId', ordersController.getOrderDetails);

// fix: add schema
router.post('/', authenticateUser, ordersController.createOrder);
router.post(
  '/:orderId/checkout',
  // authenticateUser,
  ordersController.checkout,
);

// fix: proteger essa rota
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
