const {
  getAllProducts,
  getOneProduct,
  putOneProduct,
} = require('../models/products');

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
      const product = await getOneProduct(productId);

      if (product.length === 0) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar produto' });
    }
  },

  updateOne: async (req, res) => {
    const { description } = req.body;
    const { productId } = req.params;
    try {
      const updateProduct = await putOneProduct(description, productId);

      if (updateProduct.affectedRows === 0) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      res.json(updateProduct);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar produto' });
    }
  },
};

module.exports = { productsController };
