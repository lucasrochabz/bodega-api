import { productsRepository } from '../repositories/productsRepository.js';
import Product from '../entities/productEntity.js';
import { ProductsErrors } from '../errors/productsErrors.js';

export const productsService = {
  getAllProducts: async ({ pageNumber, pageSizeNumber }) => {
    const offset = (pageNumber - 1) * pageSizeNumber;

    const totalProducts = await productsRepository.countAll();
    const totalPages = Math.ceil(totalProducts / pageSizeNumber);

    const products = await productsRepository.findAll({
      limit: pageSizeNumber,
      offset,
    });

    if (products.length === 0) {
      throw ProductsErrors.PRODUCTS_NOT_FOUND;
    }

    return {
      items: products,
      pagination: {
        totalPages,
      },
    };
  },

  getProduct: async (productId) => {
    await productsRepository.updateViews(productId);
    const product = await productsRepository.findByProductId(productId);

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

  updateProduct: async ({ productId, description }) => {
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

  deleteProduct: async (productId) => {
    const product = await productsRepository.deleteById(productId);

    if (product.affectedRows === 0) {
      throw ProductsErrors.PRODUCT_NOT_FOUND;
    }

    return { id: productId };
  },
};
