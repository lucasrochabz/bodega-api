import express from 'express';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import { validateQuery } from '../middlewares/validateQuery.js';
import { validateParams } from '../middlewares/validateParams.js';
import { paginationSchema } from '../schemas/paginationSchema.js';
import { productParamsSchema } from '../schemas/productParamsSchema.js';
import { productsController } from '../controllers/productsController.js';

const router = express.Router();

router.get(
  '/',
  validateQuery(paginationSchema),
  productsController.getAllProducts,
);

router.get(
  '/:productId',
  validateParams(productParamsSchema),
  productsController.getProduct,
);

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
