const { getAllProducts } = require('../models/products');

const productsController = {
  listAllProducts: async (req, res) => {
    const showProducts = await getAllProducts();
    res.json(showProducts);
  },
};

module.exports = { productsController };
