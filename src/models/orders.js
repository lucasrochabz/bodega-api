const { getDBConnection } = require('../utils/getDBConnection');

const getAllOrders = async () => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      SELECT * FROM orders`,
    );
    return results;
  } finally {
    await connection.end();
  }
};

const getOrder = async (orderId) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      SELECT * FROM orders WHERE id=?`,
      [orderId],
    );
    return results;
  } finally {
    await connection.end();
  }
};

const createOrder = async ({
  user_id,
  address_id,
  date,
  status,
  product_id,
}) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      INSERT INTO orders (user_id, address_id, date, status, product_id)
      VALUES (?, ?, ?, ?, ?)`,
      [user_id, address_id, date, status, product_id],
    );
    return results;
  } finally {
    await connection.end();
  }
};

module.exports = { getAllOrders, getOrder, createOrder };
