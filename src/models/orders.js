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
  } catch (error) {
    await connection.end();
  }
};

module.exports = { getAllOrders, getOrder };
