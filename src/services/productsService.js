import { productsRepository } from '../repositories/productsRepository.js';
import Product from '../models/productModel.js';
import { ProductsErrors } from '../errors/productsErrors.js';

export const productsService = {
  getAllProducts: async ({ pageNumber, pageSizeNumber }) => {
    const products = await productsRepository.findAll({
      pageNumber,
      pageSizeNumber,
    });

    if (products.results.length === 0) {
      return { error: ProductsErrors.PRODUCTS_NOT_FOUND };
    }

    return {
      message: 'Produtos encontrados com sucesso.',
      data: { totalPages: products.totalPages, results: products.results },
    };
  },

  getProduct: async (productId) => {
    const product = await productsRepository.findByProductId(productId);

    if (product.length === 0) {
      return { error: ProductsErrors.PRODUCT_NOT_FOUND };
    }

    return {
      message: 'Produto encontrado com sucesso.',
      data: product,
    };
  },

  createProduct: async (productData) => {
    const product = new Product(productData);
    const result = await productsRepository.insert(product.toPersistence());

    if (result.affectedRows === 0) {
      return { error: ProductsErrors.PRODUCT_NOT_CREATED };
    }

    product.id = result.insertId;

    return {
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
      return { error: ProductsErrors.PRODUCT_NOT_FOUND };
    }

    return {
      message: 'Produto atualizado com sucesso.',
      data: { id: productId, description },
    };
  },

  deleteProduct: async (productId) => {
    const product = await productsRepository.deleteById(productId);

    if (product.affectedRows === 0) {
      return { error: ProductsErrors.PRODUCT_NOT_FOUND };
    }

    return {
      message: 'Produto deletado com sucesso.',
      data: { id: productId },
    };
  },
};
