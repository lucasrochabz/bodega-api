const express = require('express');
const router = express.Router();
const {
  authenticate,
  authorizeAdmin,
} = require('../middlewares/authMiddleware');
const { productsController } = require('../controllers/productsController');

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
router.delete('/:productId', productsController.deleteProduct);

module.exports = router;
