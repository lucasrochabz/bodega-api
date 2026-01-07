import express from 'express';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import { validateBody } from '../middlewares/validateBody.js';
import { orderSchema } from '../schemas/orders/orderSchema.js';
import { ordersController } from '../controllers/ordersController.js';

const router = express.Router();

router.get('/', authenticate, authorizeAdmin, ordersController.getAllOrders);
router.get('/user', authenticate, ordersController.getUserOrders);
// fix: proteger essa rota
router.get('/:orderId', ordersController.getOrderDetails);

router.post('/', authenticate, ordersController.createOrder);

// fix: proteger essa rota
router.put(
  '/:orderId',
  validateBody(orderSchema),
  ordersController.updateOrder,
);

router.delete(
  '/:orderId',
  authenticate,
  authorizeAdmin,
  ordersController.deleteOrder,
);

export default router;
