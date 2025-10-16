import { productsRepository } from '../repositories/productsRepository.js';
import Product from '../models/productsModel.js';

export const productsService = {
  getAllProducts: async ({ pageNumber, pageSizeNumber }) => {
    try {
      const products = await productsRepository.findAll({
        pageNumber,
        pageSizeNumber,
      });

      if (products.results.length === 0) {
        return { success: false, message: 'Produtos não encontrados.' };
      }

      return {
        success: true,
        message: 'Produtos encontrados com sucesso.',
        data: { totalPages: products.totalPages, results: products.results },
      };
    } catch (error) {
      console.error('Erro no Service ao buscar produtos:', error);
      return {
        success: false,
        message: 'Erro no Service ao buscar produtos.',
      };
    }
  },

  getProduct: async (productId) => {
    try {
      const product = await productsRepository.findByProductId(productId);

      if (product.length === 0) {
        return { success: false, message: 'Produto não encontrado.' };
      }

      return {
        success: true,
        message: 'Produto encontrado com sucesso.',
        data: product,
      };
    } catch (error) {
      console.error('Erro no Service ao buscar produto:', error);
      return {
        success: false,
        message: 'Erro no Service ao buscar produto.',
      };
    }
  },

  createProduct: async (productData) => {
    const product = new Product(productData);
    try {
      const newProduct = await productsRepository.insert(product);

      if (newProduct.affectedRows === 0) {
        return { success: false, message: 'Produto não cadastrado.' };
      }

      return {
        success: true,
        message: 'Produto cadastrado com sucesso.',
        data: {
          id: newProduct.insertId,
          name: product.name,
          price: product.price,
          description: product.description,
          stock: product.stock,
          status: product.status,
          image_path: product.image_path,
        },
      };
    } catch (error) {
      console.error('Erro no Service ao cadastrar produto:', error);
      return {
        success: false,
        message: 'Erro no Service ao cadastrar produto.',
      };
    }
  },

  updateProduct: async ({ description, productId }) => {
    try {
      const product = await productsRepository.updateById({
        description,
        productId,
      });

      if (product.affectedRows === 0) {
        return { success: false, message: 'Produto não encontrado.' };
      }

      return {
        success: true,
        message: 'Produto atualizado com sucesso.',
        data: { id: productId, description },
      };
    } catch (error) {
      console.error('Erro no Service ao atualizar produto:', error);
      return {
        success: false,
        message: 'Erro no Service ao atualizar produto.',
      };
    }
  },

  deleteProduct: async (productId) => {
    try {
      const product = await productsRepository.deleteById(productId);

      if (product.affectedRows === 0) {
        return { success: false, message: 'Produto não encontrado.' };
      }

      return {
        success: true,
        message: 'Produto deletado com sucesso.',
        data: { id: productId },
      };
    } catch (error) {
      console.error('Erro no Service ao deletar produto:', error);
      return {
        success: false,
        message: 'Erro no Service ao deletar produto.',
      };
    }
  },
};
