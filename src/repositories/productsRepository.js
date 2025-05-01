const { getDBConnection } = require('../database/connection');
const executeQuery = require('../helpers/databaseQuery');

const productsRepository = {
  fetchAll: async ({ pageNumber, pageSizeNumber }) => {
    const connection = await getDBConnection();
    try {
      const offset = (pageNumber - 1) * pageSizeNumber;

      const [countResults] = await connection.query(
        `
        SELECT COUNT(*)
        AS total
        FROM products`,
      );

      const totalProducts = countResults[0].total;
      const totalPages = Math.ceil(totalProducts / pageSizeNumber);

      const [results] = await connection.query(
        `
        SELECT id, name, price, description, image_path
        FROM products
        LIMIT ? OFFSET ?`,
        [pageSizeNumber, offset],
      );

      return { results, totalPages };
    } catch (error) {
      console.error('Erro ao buscar produtos no Banco de Dados:', error);
      throw new Error('Erro ao buscar produtos no Banco de Dados.');
    } finally {
      await connection.end();
    }
  },

  fetchById: async (productID) => {
    const query = `
      SELECT id, name, price, description, stock, status, image_path
      FROM products WHERE id = ?
    `;

    const errorMessage = 'Erro ao buscar produto no Banco de Dados';

    return await executeQuery(query, [productID], errorMessage);
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
    const query = `
      UPDATE products
      SET description = ?
      WHERE id = ?
    `;

    const errorMessage = 'Erro ao atualizar pedido no Banco de Dados';

    return await executeQuery(query, [description, productId], errorMessage);
  },

  removeById: async (productId) => {
    const query = `
      DELETE FROM products WHERE id = ?
    `;

    const errorMessage = 'Erro ao deletar produto no Banco de Dados';

    return await executeQuery(query, [productId], errorMessage);
  },
};

module.exports = { productsRepository };
