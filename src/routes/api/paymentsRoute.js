import express from 'express';
import { paymentsController } from '../../controllers/paymentsController.js';

const router = express.Router();

router.post('/checkout', paymentsController.checkout);

export default router;
