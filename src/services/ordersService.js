const { getDBConnection } = require('../database/connection');

const ordersService = {
  fetchAllOrders: async () => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        SELECT id, user_id, address_id, created_at, status
        FROM orders`,
      );

      if (results.length === 0) {
        return { success: false, message: 'Pedidos não encontrados.' };
      }

      return { success: true, data: results };
    } catch (error) {
      console.error('Erro ao buscar pedidos no Banco de Dados:', error);
      return {
        success: false,
        message: 'Erro ao buscar pedidos no Banco de Dados.',
      };
    } finally {
      await connection.end();
    }
  },

  fetchUserOrders: async (userId) => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        SELECT 
          orders.id,
          orders.created_at,
          orders.status,
          orders_products.product_id,
          products.name,
          products.price,
          products.image_path
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

      if (results.length === 0) {
        return {
          success: false,
          message: 'Pedido(s) do usuário não encontrado(s) no Banco de Dados.',
        };
      }

      return { success: true, data: results };
    } catch (error) {
      console.error(
        'Erro ao buscar pedido(s) do usuário no Banco de Dados:',
        error,
      );
      return {
        success: false,
        message: 'Erro ao buscar pedido(s) do usuário no Banco de Dados.',
      };
    } finally {
      await connection.end();
    }
  },

  fetchOrderDetails: async (orderId) => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        SELECT
          orders.id,
          orders.created_at,
          orders.status,
          orders_products.product_id,
          orders_products.quantity,
          products.name,
          products.price,
          products.image_path
        FROM
          orders
        JOIN
          orders_products ON orders.id = orders_products.order_id
        JOIN
          products ON orders_products.product_id = products.id
        WHERE
          orders.id = ?`,
        [orderId],
      );

      if (results.length === 0) {
        return { success: false, message: 'Pedido não encontrado.' };
      }

      return { success: true, data: results[0] };
    } catch (error) {
      console.error('Erro ao buscar pedido no Banco de Dados:', error);
      return {
        success: false,
        message: 'Erro ao buscar pedido no Banco de Dados.',
      };
    } finally {
      await connection.end();
    }
  },

  createOrderInDB: async ({ userId, status, products }) => {
    const connection = await getDBConnection();
    try {
      const [addressResult] = await connection.query(
        `
        SELECT id
        FROM addresses
        WHERE id = ?`,
        [userId],
      );

      const addressUser = addressResult[0].id;

      const [orderResult] = await connection.query(
        `
        INSERT INTO orders (user_id, address_id, status)
        VALUES (?, ?, ?)`,
        [userId, addressUser, status],
      );

      if (orderResult.affectedRows === 0) {
        return { success: false, message: 'Pedido não cadastrado.' };
      }

      const orderId = orderResult.insertId;

      const orderProducts = products.map((product) => [
        orderId,
        product.product_id,
        product.quantity,
      ]);

      const [productResult] = await connection.query(
        `
        INSERT INTO orders_products (order_id, product_id, quantity)
        VALUES ?`,
        [orderProducts],
      );

      return {
        success: true,
        data: {
          id: orderResult.insertId,
          userId,
          addressUser,
          status,
          products,
        },
      };
    } catch (error) {
      console.error('Erro ao cadastrar pedido no Banco de Dados:', error);
      return {
        success: false,
        message: 'Erro ao cadastrar pedido no Banco de Dados.',
      };
    } finally {
      await connection.end();
    }
  },

  updateOrderInDB: async ({ product_id, orderId }) => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        UPDATE orders
        SET product_id = ?
        WHERE id = ?`,
        [product_id, orderId],
      );

      if (results.affectedRows === 0) {
        return { success: false, message: 'Pedido não encontrado.' };
      }

      return { success: true, data: { id: orderId, product_id } };
    } catch (error) {
      console.error('Erro ao atualizar pedido no Banco de Dados:', error);
      return {
        success: false,
        message: 'Erro ao atualizar pedido no banco de dados.',
      };
    } finally {
      await connection.end();
    }
  },

  deleteOrderInDB: async (orderId) => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        DELETE FROM orders WHERE id = ?`,
        [orderId],
      );

      if (results.affectedRows === 0) {
        return { success: false, message: 'Pedido não encontrado.' };
      }

      return { success: true, data: { id: orderId } };
    } catch (error) {
      console.error('Erro ao deletar pedido no Banco de Dados:', error);
      return {
        success: false,
        message: 'Erro ao deletar pedido no Banco de Dados.',
      };
    } finally {
      await connection.end();
    }
  },
};

module.exports = { ordersService };
