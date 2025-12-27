import { productsService } from '../services/productsService.js';
import { handleServiceResponse } from '../helpers/handleServiceResponse.js';
import { ProductsErrors } from '../errors/productsErrors.js';
import { CommonErrors } from '../errors/commonErrors.js';

export const productsController = {
  getAllProducts: async (req, res) => {
    const { page, pageSize } = req.query;

    const pageNumber = parseInt(page) || 1;
    const pageSizeNumber = parseInt(pageSize) || 10;
    try {
      const productsResult = await productsService.getAllProducts({
        pageNumber,
        pageSizeNumber,
      });

      handleServiceResponse(res, productsResult, 200, ProductsErrors);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);

      const { statusCode, message } = CommonErrors.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).json({
        success: false,
        message,
      });
    }
  },

  getProduct: async (req, res) => {
    const { productId } = req.params;
    try {
      const productResult = await productsService.getProduct(productId);
      handleServiceResponse(res, productResult, 200, ProductsErrors);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);

      const { statusCode, message } = CommonErrors.INTERNAL_SERVER_ERROR;
      return res.status(statusCode, message).json({
        success: false,
        message,
      });
    }
  },

  createProduct: async (req, res) => {
    const allowedFields = [
      'name',
      'price',
      'description',
      'stock',
      'status',
      'image_path',
    ];

    const productData = allowedFields.reduce((obj, key) => {
      if (req.body[key] !== undefined) {
        obj[key] = req.body[key];
      }
      return obj;
    }, {});

    try {
      // req.body JÁ vem validado, normalizado e sem campos extras
      // fix: const productData = craeteProductDTO(req.body);

      const result = await productsService.createProduct(productData);
      handleServiceResponse(res, result, 201, ProductsErrors);
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);

      const { statusCode, message } = CommonErrors.INTERNAL_SERVER_ERROR;
      res.status(statusCode).json({
        success: false,
        message,
      });
    }
  },

  // fix: quando fizer atualizar o service atualizar o controller
  updateProduct: async (req, res) => {
    const { productId } = req.params;
    const { description } = req.body;
    try {
      const updatedProduct = await productsService.updateProduct({
        productId,
        description,
      });

      handleServiceResponse(res, updatedProduct, 200, 400);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao atualizar produto.',
      });
    }
  },

  deleteProduct: async (req, res) => {
    const { productId } = req.params;
    try {
      const deletedProduct = await productsService.deleteProduct(productId);
      handleServiceResponse(res, deletedProduct, 200, ProductsErrors);
    } catch (error) {
      console.error('Erro ao deletar produto:', error);

      const { statusCode, message } = CommonErrors.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).json({
        success: false,
        message,
      });
    }
  },
};
