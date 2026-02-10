import express from 'express';
import {
  authenticateUser,
  authorizeAdmin,
} from '../../middlewares/authMiddleware.js';
import { validateQuery } from '../../middlewares/validateQuery.js';
import { validateParams } from '../../middlewares/validateParams.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { paginationSchema } from '../../schemas/shared/paginationSchema.js';
import { productParamsSchema } from '../../schemas/products/productParamsSchema.js';
import { createProductSchema } from '../../schemas/products/createProductSchema.js';
import { productsController } from '../../controllers/productsController.js';

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
  authenticateUser,
  authorizeAdmin,
  validateBody(createProductSchema),
  productsController.createProduct,
);

router.patch(
  '/:productId',
  authenticateUser,
  authorizeAdmin,
  productsController.updateProduct,
);

router.delete(
  '/:productId',
  authenticateUser,
  authorizeAdmin,
  productsController.deleteProduct,
);

export default router;
