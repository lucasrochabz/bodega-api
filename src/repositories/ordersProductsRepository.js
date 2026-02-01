import executeQuery from '../database/executeQuery.js';

export const ordersProductsRepository = {
  insertMany: async (orderProducts) => {
    const query = `
      INSERT INTO orders_products (order_id, product_id, quantity)
      VALUES ?
    `;
    const params = [orderProducts];

    return await executeQuery(query, params);
  },
};
