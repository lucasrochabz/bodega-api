const express = require('express');
const router = express.Router();
const { cartsController } = require('../controllers/cartsController');

router.put('/addToCart', cartsController.getCarts);

module.exports = router;
