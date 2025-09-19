import executeQuery from '../helpers/databaseQuery.js';

export const ordersProductsRepository = {
  insertMany: async (orderProducts) => {
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
