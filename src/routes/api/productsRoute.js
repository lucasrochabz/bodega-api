import express from 'express';
import {
  authenticateUser,
  authorizeAdmin,
} from '../../middlewares/authMiddleware.js';
import { validate } from '../../middlewares/validate.js';
import { paginationSchema } from '../../schemas/shared/paginationSchema.js';
import { productParamsSchema } from '../../schemas/products/productParamsSchema.js';
import { createProductSchema } from '../../schemas/products/createProductSchema.js';
import { productsController } from '../../controllers/productsController.js';

const router = express.Router();

router.get(
  '/',
  validate({ query: paginationSchema }),
  productsController.getAllProducts,
);
router.get(
  '/:productId',
  validate({ params: productParamsSchema }),
  productsController.getProductById,
);

router.post(
  '/',
  authenticateUser,
  authorizeAdmin,
  validate({ body: createProductSchema }),
  productsController.createProduct,
);

router.patch(
  '/:productId',
  authenticateUser,
  authorizeAdmin,
  productsController.updateProductById,
);

router.delete(
  '/:productId',
  authenticateUser,
  authorizeAdmin,
  productsController.deleteProductById,
);

export default router;
