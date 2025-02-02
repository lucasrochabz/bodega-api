const { productsService } = require('../services/productsService');
const Product = require('../models/productsModel');

const productsController = {
  listAllProducts: async (req, res) => {
    try {
      const products = await productsService.getAllProductsFromDB();

      if (!products.success) {
        return res.status(404).json({
          success: false,
          message: products.message,
        });
      }

      res.status(200).json({
        success: true,
        message: 'Produtos encontrados com sucesso.',
        data: products.data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar produtos.',
      });
    }
  },

  getProduct: async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await productsService.getProductFromDB(productId);

      if (!product.success) {
        return res.status(404).json({
          success: false,
          message: product.message,
        });
      }

      res.status(200).json({
        success: true,
        message: 'Produto encontrado com sucesso.',
        data: product.data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar produto.',
      });
    }
  },

  createProduct: async (req, res) => {
    const { name, price, description, stock, status, image_path } = req.body;
    try {
      const newProduct = new Product({
        name,
        price,
        description,
        stock,
        status,
        image_path,
      });
      const result = await productsService.createProductInDB(newProduct);

      if (!result.success) {
        return res.status(404).json({
          success: false,
          message: result.message,
        });
      }

      res.status(201).json({
        success: true,
        message: 'Produto cadastrado com sucesso.',
        data: result.data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao cadastrar produto.',
      });
    }
  },

  updateProduct: async (req, res) => {
    const { description } = req.body;
    const { productId } = req.params;
    try {
      const updatedProduct = await productsService.updateProductInDB({
        description,
        productId,
      });

      if (!updatedProduct.success) {
        return res.status(404).json({
          success: false,
          message: updatedProduct.message,
        });
      }

      res.status(200).json({
        success: true,
        message: 'Produto atualizado com sucesso.',
        data: updatedProduct.data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar produto.',
      });
    }
  },

  deleteProduct: async (req, res) => {
    const { productId } = req.params;
    try {
      const deletedProduct = await productsService.deleteProductInDB(productId);

      if (!deletedProduct.success) {
        return res.status(404).json({
          success: false,
          message: deletedProduct.message,
        });
      }

      res.status(200).json({
        success: true,
        message: 'Produto deletado com sucesso.',
        data: deletedProduct.data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar produto.',
      });
    }
  },
};

module.exports = { productsController };
