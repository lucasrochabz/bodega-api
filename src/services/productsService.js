const { productsRepository } = require('../repositories/productsRepository');

const productsService = {
  fetchAllProducts: async ({ pageNumber, pageSizeNumber }) => {
    try {
      const products = await productsRepository.fetchAll({
        pageNumber,
        pageSizeNumber,
      });

      if (products.results.length === 0) {
        return { success: false, message: 'Produtos não encontrados.' };
      }

      return {
        success: true,
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

  fetchProduct: async (productId) => {
    try {
      const product = await productsRepository.fetchById(productId);

      if (product.length === 0) {
        return { success: false, message: 'Produto não encontrado.' };
      }

      return { success: true, data: product[0] };
    } catch (error) {
      console.error('Erro no Service ao buscar produto:', error);
      return {
        success: false,
        message: 'Erro no Service ao buscar produto.',
      };
    }
  },

  registerProduct: async (product) => {
    try {
      const newProduct = await productsRepository.insertProduct(product);

      if (newProduct.affectedRows === 0) {
        return { success: false, message: 'Produto não cadastrado.' };
      }

      return {
        success: true,
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

  editProduct: async ({ description, productId }) => {
    try {
      const product = await productsRepository.editById({
        description,
        productId,
      });

      if (product.affectedRows === 0) {
        return { success: false, message: 'Produto não encontrado.' };
      }

      return { success: true, data: { id: productId, description } };
    } catch (error) {
      console.error('Erro no Service ao atualizar produto:', error);
      return {
        success: false,
        message: 'Erro no Service ao atualizar produto.',
      };
    }
  },

  removeProduct: async (productId) => {
    try {
      const product = await productsRepository.removeById(productId);

      if (product.affectedRows === 0) {
        return { success: false, message: 'Produto não encontrado.' };
      }

      return { success: true, data: { id: productId } };
    } catch (error) {
      console.error('Erro no Service ao deletar produto:', error);
      return {
        success: false,
        message: 'Erro no Service ao deletar produto.',
      };
    }
  },
};

module.exports = { productsService };
