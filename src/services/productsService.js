import { productsRepository } from '../repositories/productsRepository.js';
import Product from '../models/productsModel.js';

export const productsService = {
  getAllProducts: async ({ pageNumber, pageSizeNumber }) => {
    const products = await productsRepository.findAll({
      pageNumber,
      pageSizeNumber,
    });

    if (products.results.length === 0) {
      return { success: false, error: 'PRODUCTS_NOT_FOUND' };
    }

    return {
      success: true,
      message: 'Produtos encontrados com sucesso.',
      data: { totalPages: products.totalPages, results: products.results },
    };
  },

  getProduct: async (productId) => {
    const product = await productsRepository.findByProductId(productId);

    if (product.length === 0) {
      return { success: false, erro: 'PRODUCT_NOT_FOUND' };
    }

    return {
      success: true,
      message: 'Produto encontrado com sucesso.',
      data: product,
    };
  },

  createProduct: async (productData) => {
    const product = new Product(productData);
    const newProduct = await productsRepository.insert(product);

    if (newProduct.affectedRows === 0) {
      return { success: false, error: 'PRODUCT_NOT_CREATED' };
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
  },

  // fix: Atualizar essa função do service
  updateProduct: async ({ productId, description }) => {
    try {
      const product = await productsRepository.updateById({
        productId,
        description,
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
    const product = await productsRepository.deleteById(productId);

    if (product.affectedRows === 0) {
      return { success: false, error: 'PRODUCT_NOT_FOUND' };
    }

    return {
      success: true,
      message: 'Produto deletado com sucesso.',
      data: { id: productId },
    };
  },
};
