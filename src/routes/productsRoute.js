const express = require('express');
const router = express.Router();
const { productsController } = require('../controllers/productsController');

router.get('/', productsController.getAllProducts);
router.get('/:productId', productsController.getProduct);
router.post('/', productsController.createProduct);
router.put('/:productId', productsController.updateProduct);
router.delete('/:productId', productsController.deleteProduct);

module.exports = router;
