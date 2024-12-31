const { getDBConnection } = require('../config/database');

const getAllOrdersFromDB = async () => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      SELECT * FROM orders`,
    );

    if (results.length === 0) {
      return { success: false, message: 'Pedidos não encontrados.' };
    }

    return { success: true, data: results };
  } catch (error) {
    console.error('Erro ao buscar pedidos no Banco de dados:', error);
    return {
      success: false,
      message: 'Erro ao buscar pedidos no banco de dados.',
    };
  } finally {
    await connection.end();
  }
};

const getOrderFromDB = async (orderId) => {
  const connection = await getDBConnection();
  try {
    const [orderResult] = await connection.query(
      `
      SELECT * FROM orders WHERE id=?`,
      [orderId],
    );

    if (orderResult.length === 0) {
      return { success: false, message: 'Pedido não encontrado.' };
    }

    const [productResult] = await connection.query(
      `
      SELECT name, price, image_path FROM products WHERE id=?`,
      [orderResult[0].product_id],
    );

    return {
      success: true,
      data: { ...orderResult[0], product: productResult[0] },
    };
  } catch (error) {
    console.error('Erro ao buscar pedido no Banco de Dados:', error);
    return {
      success: false,
      message: 'Erro ao buscar pedido no Banco de Dados.',
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
      return { success: false, message: 'Pedido não cadastrado.' };
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
    console.error('Erro ao cadastrar pedido no Banco de Dados:', error);
    return {
      success: false,
      message: 'Erro ao cadastrar pedido no Banco de Dados.',
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
};

module.exports = {
  getAllOrdersFromDB,
  getOrderFromDB,
  createOrderInDB,
  updateOrderInDB,
  deleteOrderInDB,
};
