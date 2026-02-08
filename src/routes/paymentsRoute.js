import express from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { paymentsController } from '../controllers/paymentsController.js';

const router = express.Router();

router.post('/checkout', paymentsController.checkout);

export default router;
