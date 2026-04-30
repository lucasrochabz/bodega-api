import express from 'express';
import {
  authenticateUser,
  authorizeAdmin,
} from '#shared/middlewares/authMiddleware.js';
import { validate } from '#shared/middlewares/validate.js';
import { paginationSchema } from '#src/schemas/shared/paginationSchema.js';
import { productParamsSchema } from '#src/schemas/products/productParamsSchema.js';
import { createProductSchema } from '#src/schemas/products/createProductSchema.js';
import { productsController } from '#src/controllers/products.controller.js';

const router = express.Router();

router.get(
  '/',
  validate({ query: paginationSchema }),
  productsController.getAllProducts,
);
router.get(
  '/:slug',
  validate({ params: productParamsSchema }),
  productsController.getProductBySlug,
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
