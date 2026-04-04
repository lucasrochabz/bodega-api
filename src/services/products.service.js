import { productsRepository } from '../repositories/products.repository.js';
import Product from '../entities/product.entity.js';
import {
  buildPagination,
  getPaginationMeta,
} from '#shared/utils/paginations.utils.js';
import { ProductsErrors } from '#shared/errors/productsErrors.js';

export const productsService = {
  getAllProducts: async ({ pageNumber, limitNumber }) => {
    const { offset, limit } = buildPagination(pageNumber, limitNumber);

    const totalItems = await productsRepository.countAll();

    const products = await productsRepository.findAll({
      offset,
      limit,
    });

    if (products.length === 0) {
      throw ProductsErrors.PRODUCTS_NOT_FOUND;
    }

    const pagination = getPaginationMeta({
      totalItems,
      pageNumber,
      limitNumber,
    });

    return {
      items: products,
      pagination,
    };
  },

  getProductBySlug: async (slug) => {
    await productsRepository.updateViews(slug);
    const product = await productsRepository.findBySlug(slug);

    if (!product) {
      throw ProductsErrors.PRODUCT_NOT_FOUND;
    }

    return product;
  },

  createProduct: async (productData) => {
    const product = new Product(productData);
    const productId = await productsRepository.insert(product.toPersistence());

    if (!productId) {
      throw ProductsErrors.PRODUCT_NOT_CREATED;
    }

    product.id = productId;

    return product.toPublic();
  },

  updateProductById: async ({ productId, description }) => {
    const product = await productsRepository.updateById({
      productId,
      description,
    });

    if (product.affectedRows === 0) {
      throw ProductsErrors.PRODUCT_NOT_FOUND;
    }

    return {
      id: productId,
      description,
    };
  },

  deleteProductById: async (productId) => {
    const product = await productsRepository.deleteById(productId);

    if (product.affectedRows === 0) {
      throw ProductsErrors.PRODUCT_NOT_FOUND;
    }

    return { id: productId };
  },
};
