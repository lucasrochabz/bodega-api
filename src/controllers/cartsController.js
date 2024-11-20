const { addToCart } = require('../models/carts');

const cartsController = {
  getCarts: async (req, res) => {
    const carts = await addToCart();
    res.json(carts);
  },
};

module.exports = { cartsController };
