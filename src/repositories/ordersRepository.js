import executeQuery from '../helpers/executeQuery.js';

export const ordersRepository = {
  findAll: async () => {
    const query = `
      SELECT id, user_id, address_id, created_at, status
      FROM orders
    `;

    return await executeQuery(query);
  },

  findById: async (orderId) => {
    const query = `
      SELECT
        orders.id,
        orders.status,
        orders.created_at,
        products.name,
        products.price,
        products.image_path,
        addresses.street,
        addresses.number,
        addresses.neighborhood,
        addresses.city,
        addresses.state,
        addresses.zip_code
      FROM
        orders
      JOIN
        orders_products ON orders.id = orders_products.order_id
      JOIN
        products ON orders_products.product_id = products.id
      JOIN
        addresses ON orders.address_id = addresses.id
      WHERE
        orders.id = ?
    `;
    const params = [orderId];

    const result = await executeQuery(query, params);
    return result[0];
  },

  findAllByUserId: async (userId) => {
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

    return await executeQuery(query, params);
  },

  insert: async ({ userId, addressId, status }) => {
    const query = `
      INSERT INTO orders (user_id, address_id, status)
      VALUES (?, ?, ?)
    `;
    const params = [userId, addressId, status];

    const results = await executeQuery(query, params);
    return results.insertId;
  },

  updateById: async ({ status, order_id }) => {
    const query = `
      UPDATE orders
      SET status = ?
      WHERE id = ?
      AND status <> ?
    `;
    const params = [status, order_id, status];

    return await executeQuery(query, params);
  },

  deleteById: async (orderId) => {
    const query = `
      DELETE FROM orders WHERE id = ?
    `;
    const params = [orderId];

    return await executeQuery(query, params);
  },
};
