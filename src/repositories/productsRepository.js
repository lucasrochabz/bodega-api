const { getDBConnection } = require('../database/connection');

const productsRepository = {
  getAllProducts: async () => {
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
};

module.exports = { productsRepository };
