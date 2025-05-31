import express from 'express';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import { productsController } from '../controllers/productsController.js';

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:productId', productsController.getProduct);
router.post(
  '/',
  authenticate,
  authorizeAdmin,
  productsController.createProduct,
);
router.put(
  '/:productId',
  authenticate,
  authorizeAdmin,
  productsController.updateProduct,
);
router.delete(
  '/:productId',
  authenticate,
  authorizeAdmin,
  productsController.deleteProduct,
);

export default router;
