import { productsService } from '../services/productsService.js';
import { createProductDTO } from '../dtos/createProductDTO.js';
import { createProductResDTO } from '../dtos/createProductResDTO.js';
import { getAllProductsResDTO } from '../dtos/getAllProductsResDTO.js';
import { handleResponse } from '../helpers/handleResponse.js';
import { handleError } from '../helpers/handleError.js';
import { CommonErrors } from '../errors/commonErrors.js';

export const productsController = {
  getAllProducts: async (req, res) => {
    const { page, pageSize } = req.query;

    const pageNumber = parseInt(page) || 1;
    const pageSizeNumber = parseInt(pageSize) || 10;
    try {
      const result = await productsService.getAllProducts({
        pageNumber,
        pageSizeNumber,
      });

      const data = getAllProductsResDTO(result);

      handleResponse(
        res,
        {
          message: 'Produtos encontrados com sucesso FOIII fix:.',
          data,
        },
        200,
      );
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
    try {
      const productData = createProductDTO(req.body);
      const result = await productsService.createProduct(productData);
      // fix: acho que não precisa do DTO pois o ideal é retornar apenas uma mensagem.
      const response = createProductResDTO(result);
      handleResponse(res, response, 201);
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
