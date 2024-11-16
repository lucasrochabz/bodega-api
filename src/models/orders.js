const { getDBConnection } = require('../utils/getDBConnection');

const getAllOrdersFromDB = async () => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      SELECT * FROM orders`,
    );

    if (results.length === 0) {
      return { success: false, message: 'Pedidos não encontrados' };
    }

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

const getOrderFromDB = async (orderId) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      SELECT * FROM orders WHERE id=?`,
      [orderId],
    );

    if (results.length === 0) {
      return { success: false, message: 'Pedido não encontrado' };
    }

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

const createOrderInDB = async ({
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

    if (results.affectedRows === 0) {
      return { success: false, message: 'Pedido não foi cadastrado' };
    }

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

    if (results.affectedRows === 0) {
      return { success: false, message: 'Pedido não encontrado' };
    }

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

    if (results.affectedRows === 0) {
      return { success: false, message: 'Pedido não foi encontrado' };
    }

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
  getAllOrdersFromDB,
  getOrderFromDB,
  createOrderInDB,
  updateOrder,
  deleteOrder,
};
