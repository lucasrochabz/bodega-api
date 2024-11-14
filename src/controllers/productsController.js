const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../models/products');

const productsController = {
  listAllProducts: async (req, res) => {
    try {
      const products = await getAllProducts();

      if (!products.success) {
        return res.status(404).json({ message: 'Produtos não encontrados' });
      }
      res.status(200).json(products.data);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
  },

  getProduct: async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await getProduct(productId);

      if (!product.success) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      res.status(200).json(product.data);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar produto' });
    }
  },

  createProduct: async (req, res) => {
    const { name, price, description, stock } = req.body;
    try {
      const newProduct = await createProduct({
        name,
        price,
        description,
        stock,
      });

      if (!newProduct.success) {
        return res.status(404).json({ message: 'Produto não foi cadastrado' });
      }
      res.status(201).json(newProduct.data);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao cadastrar produto' });
    }
  },

  updateProduct: async (req, res) => {
    const { description } = req.body;
    const { productId } = req.params;
    try {
      const updatedProduct = await updateProduct({ description, productId });

      if (!updatedProduct.success) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      res.status(200).json(updatedProduct.data);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar produto' });
    }
  },

  deleteProduct: async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await deleteProduct(productId);

      if (!product.success) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      res.status(200).json(product.data);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar produto' });
    }
  },
};

module.exports = { productsController };
