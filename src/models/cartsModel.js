const { getDBConnection } = require('../config/database');

const addToCartFromDB = async () => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      SELECT * FROM orders`,
    );

    if (results.length === 0) {
      return { success: false, message: 'Pedidos não encontrados.' };
    }

    return { success: true, data: results };
  } catch (error) {
    console.error('Erro ao buscar pedidos no banco de dados:', error);
    return {
      success: false,
      message: 'Erro ao buscar pedidos no banco de dados.',
    };
  } finally {
    await connection.end();
  }
};

module.exports = { addToCartFromDB };
