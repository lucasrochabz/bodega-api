import { productsService } from '../services/productsService.js';
import { createProductDTO } from '../dtos/createProductDTO.js';
import { handleResponse } from '../helpers/handleResponse.js';
import { handleError } from '../helpers/handleError.js';
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

      handleResponse(res, productsResult, 200);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      return handleError(res, CommonErrors.INTERNAL_SERVER_ERROR);
    }
  },

  getProduct: async (req, res) => {
    const { productId } = req.params;
    try {
      const productResult = await productsService.getProduct(productId);
      handleResponse(res, productResult, 200);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      return handleError(res, CommonErrors.INTERNAL_SERVER_ERROR);
    }
  },

  createProduct: async (req, res) => {
    const productData = createProductDTO(req.body);
    try {
      const result = await productsService.createProduct(productData);
      handleResponse(res, result, 201);
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      return handleError(res, CommonErrors.INTERNAL_SERVER_ERROR);
    }
  },

  updateProduct: async (req, res) => {
    const { productId } = req.params;
    const { description } = req.body;
    try {
      const updatedProduct = await productsService.updateProduct({
        productId,
        description,
      });

      handleResponse(res, updatedProduct, 200);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      return handleError(res, CommonErrors.INTERNAL_SERVER_ERROR);
    }
  },

  deleteProduct: async (req, res) => {
    const { productId } = req.params;
    try {
      const deletedProduct = await productsService.deleteProduct(productId);
      handleResponse(res, deletedProduct, 200);
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      return handleError(res, CommonErrors.INTERNAL_SERVER_ERROR);
    }
  },
};
