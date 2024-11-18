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

    return { success: true, data: results[0] };
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

    return {
      success: true,
      data: {
        id: results.insertId,
        user_id,
        address_id,
        date,
        status,
        product_id,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao cadastrar pedido no banco de dados',
    };
  } finally {
    await connection.end();
  }
};

const updateOrderInDB = async ({ product_id, orderId }) => {
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

    return { success: true, data: { id: orderId, product_id } };
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao atualizar pedido no banco de dados',
    };
  } finally {
    await connection.end();
  }
};

const deleteOrderInDB = async (orderId) => {
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

    return { success: true, data: { id: orderId } };
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
  updateOrderInDB,
  deleteOrderInDB,
};
