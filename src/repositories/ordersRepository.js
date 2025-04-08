const { getDBConnection } = require('../database/connection');

const ordersRepository = {
  fetchAll: async () => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        SELECT id, user_id, address_id, created_at, status
        FROM orders`,
      );

      return results;
    } catch (error) {
      console.error('Erro ao buscar pedidos no Banco de Dados:', error);
      throw new Error('Erro ao buscar pedidos no Banco de Dados.');
    } finally {
      await connection.end();
    }
  },

  fetchAllUserOrders: async (userId) => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
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
          orders.user_id = ?`,
        [userId],
      );

      return results;
    } catch (error) {
      console.error(
        'Erro ao buscar pedido(s) do usuário no Banco de Dados:',
        error,
      );
      throw new Error('Erro ao buscar pedido(s) do usuário no Banco de Dados.');
    } finally {
      await connection.end();
    }
  },

  fetchOrderById: async (orderId) => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
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
          orders.id = ?`,
        [orderId],
      );

      return results[0];
    } catch (error) {
      console.error('Erro ao buscar pedido no Banco de Dados:', error);
      throw new Error('Erro ao buscar pedido no Banco de Dados.');
    } finally {
      await connection.end();
    }
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
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        UPDATE orders
        SET status = ?
        WHERE id = ?`,
        [status, orderId],
      );

      return results;
    } catch (error) {
      console.error('Erro ao atualizar pedido no Banco de Dados:', error);
      throw new Error('Erro ao atualizar pedido no Banco de Dados.');
    } finally {
      await connection.end();
    }
  },

  removeById: async (orderId) => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        DELETE FROM orders WHERE id = ?`,
        [orderId],
      );

      return results;
    } catch (error) {
      console.error('Erro ao deletar pedido no Banco de Dados:', error);
      throw new Error('Erro ao deletar pedido no Banco de Dados.');
    } finally {
      await connection.end();
    }
  },
};

module.exports = { ordersRepository };
