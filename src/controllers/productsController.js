const {
  getAllProductsFromDB,
  getProductFromDB,
  createProductInDB,
  updateProductInDB,
  deleteProductInDB,
} = require('../models/products');

const productsController = {
  listAllProducts: async (req, res) => {
    try {
      const products = await getAllProductsFromDB();

      if (!products.success) {
        return res
          .status(404)
          .json({ success: false, message: products.message });
      }

      res.status(200).json({ success: true, data: products.data });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Erro ao buscar produtos' });
    }
  },

  getProduct: async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await getProductFromDB(productId);

      if (!product.success) {
        return res
          .status(404)
          .json({ success: false, message: product.message });
      }

      res.status(200).json({ success: true, data: product.data });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Erro ao buscar produto' });
    }
  },

  createProduct: async (req, res) => {
    const { name, price, description, stock } = req.body;
    try {
      const newProduct = await createProductInDB({
        name,
        price,
        description,
        stock,
      });

      if (!newProduct.success) {
        return res
          .status(404)
          .json({ success: false, message: newProduct.message });
      }

      res.status(201).json({ success: true, data: newProduct.data });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Erro ao cadastrar produto' });
    }
  },

  updateProduct: async (req, res) => {
    const { description } = req.body;
    const { productId } = req.params;
    try {
      const updatedProduct = await updateProductInDB({
        description,
        productId,
      });

      if (!updatedProduct.success) {
        return res
          .status(404)
          .json({ success: false, message: updatedProduct.message });
      }

      res.status(200).json({ success: true, data: updatedProduct.data });
    } catch (error) {
      res
        .status(500)
        .json({ success: true, message: 'Erro ao atualizar produto' });
    }
  },

  deleteProduct: async (req, res) => {
    const { productId } = req.params;
    try {
      const deletedProduct = await deleteProductInDB(productId);

      if (!deletedProduct.success) {
        return res
          .status(404)
          .json({ success: false, message: 'Produto não encontrado' });
      }
      res.status(200).json({ success: true, data: deletedProduct.data });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Erro ao deletar produto' });
    }
  },
};

module.exports = { productsController };
