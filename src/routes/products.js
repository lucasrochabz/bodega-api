const express = require('express');
const router = express.Router();
const { productsController } = require('../controllers/productsController');

router.get('/', productsController.listAll);
router.get('/:productId', productsController.listOne);
router.put('/:productId', productsController.updateOne);

module.exports = router;
