import { productsRepository } from '../repositories/productsRepository.js';
import Product from '../models/productModel.js';

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
    const result = await productsRepository.insert(product.toPersistence());

    if (result.affectedRows === 0) {
      return { success: false, error: 'PRODUCT_NOT_CREATED' };
    }

    product.id = result.insertId;

    return {
      success: true,
      message: 'Produto cadastrado com sucesso.',
      data: product.toPublic(),
    };
  },

  updateProduct: async ({ productId, description }) => {
    const product = await productsRepository.updateById({
      productId,
      description,
    });

    if (product.affectedRows === 0) {
      return { success: false, error: 'PRODUCT_NOT_FOUND' };
    }

    return {
      success: true,
      message: 'Produto atualizado com sucesso.',
      data: { id: productId, description },
    };
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
