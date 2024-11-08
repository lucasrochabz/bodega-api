const { getAllProducts, getOneProduct } = require('../models/products');

const productsController = {
  listAll: async (req, res) => {
    const products = await getAllProducts();
    res.json(products);
  },

  listOne: async (req, res) => {
    const { productId } = req.params;
    console.log(productId);
    const getProduct = await getOneProduct(productId);
    console.log(getProduct);
    if (getProduct.length === 0) {
      res.json({ message: 'Produto não encontrado' });
    } else {
      res.json(getProduct);
    }
  },
};

module.exports = { productsController };
