const { getDBConnection } = require('../database/connection');
const executeQuery = require('../helpers/databaseQuery');

const ordersRepository = {
  fetchAll: async () => {
    const query = `
      SELECT id, user_id, address_id, created_at, status
      FROM orders
    `;

    const errorMessage = 'Erro ao buscar pedidos no Banco de Dados';

    return await executeQuery(query, errorMessage);
  },

  fetchAllUserOrders: async (userId) => {
    const query = `
      SELECT 
        orders.id,
        products.name,
        orders.status,
        products.image_path,
        orders.created_at
      FROM 
        orders
      JOIN
        orders_products
        ON orders.id = orders_products.order_id
      JOIN 
        products ON
        orders_products.product_id = products.id
      WHERE 
        orders.user_id = ?
    `;
    const params = [userId];

    const errorMessage =
      'Erro ao buscar pedido(s) do usuário no Banco de Dados';

    return await executeQuery(query, params, errorMessage);
  },

  fetchOrderById: async (orderId) => {
    const query = `
      SELECT
        orders.id,
        orders.status,
        orders.created_at,
        products.name,
        products.price,
        products.image_path,
        orders.address_id
      FROM
        orders
      JOIN
        addresses ON orders.address_id = addresses.id
      JOIN
        orders_products ON orders.id = orders_products.order_id
      JOIN
        products ON orders_products.product_id = products.id
      WHERE
        orders.id = ?
    `;
    const params = [orderId];

    const errorMessage = 'Erro ao buscar pedido no Banco de Dados';

    const result = await executeQuery(query, params, errorMessage);
    return result[0];
  },

  insertOrder: async ({ userId, addressId, status }) => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        INSERT INTO orders (user_id, address_id, status)
        VALUES (?, ?, ?)`,
        [userId, addressId, status],
      );

      return results.insertId;
    } catch (error) {
      console.error('Erro ao cadastrar pedido no Banco de Dados:', error);
      throw new Error('Erro ao cadastrar pedido no Banco de Dados.');
    } finally {
      await connection.end();
    }
  },

  editById: async ({ status, orderId }) => {
    const query = `
      UPDATE orders
      SET status = ?
      WHERE id = ?
    `;
    const params = [status, orderId];

    const errorMessage = 'Erro ao atualizar pedido no Banco de Dados';

    return await executeQuery(query, params, errorMessage);
  },

  removeById: async (orderId) => {
    const query = `
      DELETE FROM orders WHERE id = ?
    `;
    const params = [orderId];

    const errorMessage = 'Erro ao deletar pedido no Banco de Dados';

    return await executeQuery(query, params, errorMessage);
  },
};

module.exports = { ordersRepository };
