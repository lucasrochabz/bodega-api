import { productsService } from '../services/productsService.js';

export const productsController = {
  getAllProducts: async (req, res) => {
    const { page, pageSize } = req.query;

    const pageNumber = parseInt(page);
    const pageSizeNumber = parseInt(pageSize);
    try {
      const productsResult = await productsService.getAllProducts({
        pageNumber,
        pageSizeNumber,
      });

      if (!productsResult.success) {
        return res.status(404).json(productsResult);
      }

      res.status(200).json(productsResult);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar produtos.',
      });
    }
  },

  getProduct: async (req, res) => {
    const { productId } = req.params;
    try {
      const productResult = await productsService.getProduct(productId);

      if (!productResult.success) {
        return res.status(404).json(productResult);
      }

      res.status(200).json(productResult);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar produto.',
      });
    }
  },

  createProduct: async (req, res) => {
    try {
      const result = await productsService.createProduct(req.body);

      if (!result.success) {
        return res.status(400).json(result);
      }

      res.status(201).json(result);
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
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
      const updatedProduct = await productsService.updateProduct({
        description,
        productId,
      });

      if (!updatedProduct.success) {
        return res.status(404).json(updatedProduct);
      }

      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar produto.',
      });
    }
  },

  deleteProduct: async (req, res) => {
    const { productId } = req.params;
    try {
      const deletedProduct = await productsService.deleteProduct(productId);

      if (!deletedProduct.success) {
        return res.status(404).json(deletedProduct);
      }

      res.status(200).json(deletedProduct);
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar produto.',
      });
    }
  },
};
