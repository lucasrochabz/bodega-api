const { getDBConnection } = require('../database/connection');
const executeQuery = require('../helpers/databaseQuery');

const ordersProductsRepository = {
  insertOrderProducts: async (orderProducts) => {
    const query = `
      INSERT INTO orders_products (order_id, product_id, quantity)
      VALUES ?
    `;
    const params = [orderProducts];

    const errorMessage =
      'Erro ao associar produtos ao pedido no Banco de Dados';

    return await executeQuery(query, params, errorMessage);
  },
};

module.exports = { ordersProductsRepository };
