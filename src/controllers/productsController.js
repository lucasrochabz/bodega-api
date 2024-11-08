const { getAllProducts, getOneProduct } = require('../models/products');

const productsController = {
  listAll: async (req, res) => {
    try {
      const products = await getAllProducts();

      if (products.length === 0) {
        return res.status(404).json({ message: 'Produtos não encontrados' });
      }
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
  },

  listOne: async (req, res) => {
    const { productId } = req.params;
    try {
      const getProduct = await getOneProduct(productId);

      if (getProduct.length === 0) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      res.json(getProduct);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar produto' });
    }
  },
};

module.exports = { productsController };
