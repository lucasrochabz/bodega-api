const { getDBConnection } = require('../database/connection');

const productsRepository = {
  fetchAll: async () => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        SELECT id, name, price, description, stock, status, image_path
        FROM products`,
      );

      return results;
    } catch (error) {
      console.error('Erro ao buscar produtos no Banco de Dados:', error);
      throw new Error('Erro ao buscar produtos no Banco de Dados.');
    } finally {
      await connection.end();
    }
  },

  fetchById: async (productId) => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        SELECT id, name, price, description, stock, status, image_path
        FROM products WHERE id = ?`,
        [productId],
      );

      return results;
    } catch (error) {
      console.error('Erro ao buscar produto no Banco de Dados:', error);
      throw new Error('Erro ao buscar produto no Banco de Dados.');
    } finally {
      await connection.end();
    }
  },

  insertProduct: async (newProduct) => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        INSERT INTO products (name, price, description, stock, status, image_path)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          newProduct.name,
          newProduct.price,
          newProduct.description,
          newProduct.stock,
          newProduct.status,
          newProduct.image_path,
        ],
      );

      return results;
    } catch (error) {
      console.error('Erro ao cadastrar produto no Banco de Dados:', error);
      throw new Error('Erro ao cadastrar produto no Banco de Dados.');
    } finally {
      await connection.end();
    }
  },

  editById: async ({ description, productId }) => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        UPDATE products
        SET description = ?
        WHERE id = ?`,
        [description, productId],
      );

      return results;
    } catch (error) {
      console.error('Erro ao atualizar pedido no Banco de Dados:', error);
      throw new Error('Erro ao atualizar pedido no Banco de Dados.');
    } finally {
      await connection.end();
    }
  },

  removeById: async (productId) => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        DELETE FROM products WHERE id = ?`,
        [productId],
      );

      return results;
    } catch (error) {
      console.error('Erro ao deletar produto no Banco de Dados:', error);
      throw new Error('Erro ao deletar produto no Banco de Dados.');
    } finally {
      await connection.end();
    }
  },
};

module.exports = { productsRepository };
