const { getDBConnection } = require('../database/connection');

const productsService = {
  getAllProductsFromDB: async () => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        SELECT id, name, price, description, stock, status, image_path
        FROM products`,
      );

      if (results.length === 0) {
        return { success: false, message: 'Produtos não encontrados.' };
      }

      return { success: true, data: results };
    } catch (error) {
      console.error('Erro ao buscar produtos no Banco de Dados:', error);
      return {
        success: false,
        message: 'Erro ao buscar produtos no Banco de Dados.',
      };
    } finally {
      await connection.end();
    }
  },

  getProductFromDB: async (productId) => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        SELECT id, name, price, description, stock, status, image_path
        FROM products WHERE id=?`,
        [productId],
      );

      if (results.length === 0) {
        return { success: false, message: 'Produto não encontrado.' };
      }

      return { success: true, data: results[0] };
    } catch (error) {
      console.error('Erro ao buscar produto no Banco de Dados:', error);
      return {
        success: false,
        message: 'Erro ao buscar produto no Banco de Dados.',
      };
    } finally {
      await connection.end();
    }
  },

  createProductInDB: async (product) => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        INSERT INTO products (name, price, description, stock, status, image_path)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          product.name,
          product.price,
          product.description,
          product.stock,
          product.status,
          product.image_path,
        ],
      );

      if (results.affectedRows === 0) {
        return { success: false, message: 'Produto não cadastrado.' };
      }

      return {
        success: true,
        data: {
          id: results.insertId,
          name: product.name,
          price: product.price,
          description: product.description,
          stock: product.stock,
          status: product.status,
          image_path: product.image_path,
        },
      };
    } catch (error) {
      console.error('Erro ao cadastrar produto no Banco de Dados:', error);
      return {
        success: false,
        message: 'Erro ao cadastrar produto no Banco de Dados.',
      };
    } finally {
      await connection.end();
    }
  },

  updateProductInDB: async ({ description, productId }) => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        UPDATE products
        SET description=?
        WHERE id=?`,
        [description, productId],
      );

      if (results.affectedRows === 0) {
        return { success: false, message: 'Produto não encontrado.' };
      }

      return { success: true, data: { id: productId, description } };
    } catch (error) {
      console.error('Erro ao atualizar pedido no Banco de Dados:', error);
      return {
        success: false,
        message: 'Erro ao atualizar produto no Banco de Dados.',
      };
    } finally {
      await connection.end();
    }
  },

  deleteProductInDB: async (productId) => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        DELETE FROM products WHERE id=?`,
        [productId],
      );

      if (results.affectedRows === 0) {
        return { success: false, message: 'Produto não encontrado.' };
      }

      return { success: true, data: { id: productId } };
    } catch (error) {
      console.error('Erro ao deletar produto no Banco de Dados:', error);
      return {
        success: false,
        message: 'Erro ao deletar produto no Banco de Dados.',
      };
    } finally {
      await connection.end();
    }
  },
};

module.exports = { productsService };
