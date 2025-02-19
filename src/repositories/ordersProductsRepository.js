const { getDBConnection } = require('../database/connection');

const ordersProductsRepository = {
  insertOrderProducts: async (orderProducts) => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        INSERT INTO orders_products (order_id, product_id, quantity)
        VALUES ?`,
        [orderProducts],
      );

      return results;
    } catch (error) {
      console.error(
        'Erro ao associar produtos ao pedido no Banco de Dados:',
        error,
      );
      throw new Error('Erro ao associar produtos ao pedido no Banco de Dados.');
    } finally {
      await connection.end();
    }
  },
};

module.exports = { ordersProductsRepository };
