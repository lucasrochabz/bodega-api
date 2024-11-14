const { getDBConnection } = require('../utils/getDBConnection');

const getAllOrders = async () => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      SELECT * FROM orders`,
    );
    return { success: true, data: results };
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao buscar pedidos no banco de dados',
    };
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
    return { success: true, data: results };
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao buscar pedido no banco de dados',
    };
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
    return { success: true, data: results };
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao cadastrar pedido no banco de dados',
    };
  } finally {
    await connection.end();
  }
};

const updateOrder = async ({ product_id, orderId }) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      UPDATE orders SET product_id=? WHERE id=?`,
      [product_id, orderId],
    );
    return { success: true, data: results };
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao atualizar pedido no banco de dados',
    };
  } finally {
    await connection.end();
  }
};

const deleteOrder = async (orderId) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      DELETE FROM orders WHERE id=?`,
      [orderId],
    );
    return { success: true, data: results };
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao deletar pedido no banco de dados',
    };
  } finally {
    await connection.end();
  }
};

module.exports = {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
