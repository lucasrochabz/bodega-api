import express from 'express';
import { authenticateWebhook } from '../../middlewares/authMiddleware.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { paymentSchema } from '../../schemas/webhooks/paymentSchema.js';
import { webhooksController } from '../../controllers/webhooksController.js';

const router = express.Router();

router.post(
  '/payment',
  authenticateWebhook,
  validateBody(paymentSchema),
  webhooksController.paymentWebhook,
);

export default router;
