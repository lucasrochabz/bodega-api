import express from 'express';
import { paymentsController } from '../../controllers/payments.controller.js';

const router = express.Router();

router.post('/checkout', paymentsController.checkout);

export default router;
