import { productsService } from '../services/productsService.js';
import { getAllProductsResDTO } from '../dtos/getAllProductsResDTO.js';
import { createProductDTO } from '../dtos/createProductDTO.js';
import { productDTO } from '../dtos/productDTO.js';
import { handleResponse } from '../helpers/handleResponse.js';
import { handleError } from '../helpers/handleError.js';

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

      return handleResponse(
        res,
        { message: 'Produtos encontrados com sucesso.', data },
        200,
      );
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      return handleError(res, error);
    }
  },

  getProduct: async (req, res) => {
    const { productId } = req.params;
    try {
      const result = await productsService.getProduct(productId);
      return handleResponse(
        res,
        { message: 'Produto encontrado com sucesso.', data: result },
        200,
      );
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      return handleError(res, error);
    }
  },

  createProduct: async (req, res) => {
    try {
      const productData = createProductDTO(req.body);
      const result = await productsService.createProduct(productData);
      // fix: acho que não precisa do DTO pois o ideal é retornar apenas uma mensagem.
      const data = productDTO(result);
      return handleResponse(
        res,
        { message: 'Produto cadastrado com sucesso.', data },
        201,
      );
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      return handleError(res, error);
    }
  },

  updateProduct: async (req, res) => {
    const { productId } = req.params;
    const { description } = req.body;
    try {
      const result = await productsService.updateProduct({
        productId,
        description,
      });
      return handleResponse(
        res,
        { message: 'Produto atualizado com sucesso.', data: result },
        200,
      );
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      return handleError(res, error);
    }
  },

  deleteProduct: async (req, res) => {
    const { productId } = req.params;
    try {
      const result = await productsService.deleteProduct(productId);
      return handleResponse(
        res,
        { message: 'Produto deletado com sucesso.', data: result },
        200,
      );
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      return handleError(res, error);
    }
  },
};
