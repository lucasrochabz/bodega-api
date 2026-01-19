import express from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { paymentSchema } from '../schemas/webhooks/paymentSchema.js';
import { webhooksController } from '../controllers/webhooksController.js';

const router = express.Router();

router.post(
  '/payment',
  validateBody(paymentSchema),
  webhooksController.paymentWebhook,
);

export default router;
