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
        return res.status(404).json({
          success: false,
          message: products.message,
          data: products.data,
        });
      }

      res.status(200).json({
        success: true,
        message: 'Produtos encontrados com sucesso.',
        data: products.data,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Erro ao buscar produtos.' });
    }
  },

  getProduct: async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await getProductFromDB(productId);

      if (!product.success) {
        return res.status(404).json({
          success: false,
          message: product.message,
          data: product.data,
        });
      }

      res.status(200).json({
        success: true,
        message: 'Produto encontrado com sucesso.',
        data: product.data,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Erro ao buscar produto.' });
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
        return res.status(404).json({
          success: false,
          message: newProduct.message,
          data: newProduct.data,
        });
      }

      res.status(201).json({
        success: true,
        message: 'Produto cadastrado com sucesso.',
        data: newProduct.data,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Erro ao cadastrar produto.' });
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
        return res.status(404).json({
          success: false,
          message: updatedProduct.message,
          data: updatedProduct.data,
        });
      }

      res.status(200).json({
        success: true,
        message: 'Produto atualizado com sucesso.',
        data: updatedProduct.data,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Erro ao atualizar produto.' });
    }
  },

  deleteProduct: async (req, res) => {
    const { productId } = req.params;
    try {
      const deletedProduct = await deleteProductInDB(productId);

      if (!deletedProduct.success) {
        return res.status(404).json({
          success: false,
          message: deletedProduct.message,
          data: deletedProduct.data,
        });
      }

      res.status(200).json({
        success: true,
        message: 'Produto deletado com sucesso.',
        data: deletedProduct.data,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Erro ao deletar produto.' });
    }
  },
};

module.exports = { productsController };
