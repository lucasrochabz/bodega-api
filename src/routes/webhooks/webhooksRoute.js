import express from 'express';
import { authenticateWebhook } from '../../middlewares/authMiddleware.js';
import { validate } from '../../middlewares/validate.js';
import { paymentSchema } from '../../schemas/webhooks/paymentSchema.js';
import { webhooksController } from '../../controllers/webhooksController.js';

const router = express.Router();

router.post(
  '/payment',
  authenticateWebhook,
  validate({ body: paymentSchema }),
  webhooksController.paymentWebhook,
);

export default router;
