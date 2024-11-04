const { show } = require('../models/products');

const productsController = {
  listAll: async (req, res) => {
    const showProducts = await show();
    res.json(showProducts);
  },
};

module.exports = { productsController };
