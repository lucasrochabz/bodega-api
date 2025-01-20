const { getDBConnection } = require('../config/database');

const getAllOrdersFromDB = async () => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      SELECT id, user_id, address_id, date, status
      FROM orders`,
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

const getOrdersUserFromDB = async (userId) => {
  const connection = await getDBConnection();

  // Buscar pedidos do usuário
  const [orders] = await connection.query(
    `
    SELECT id, date
    FROM orders
    WHERE user_id=?`,
    [userId],
  );

  // Extrair os IDs dos pedidos
  const ordersIds = orders.map((order) => order.id);

  // Buscar os produtos relacionados aos pedidos
  const [ordersProductsResults] = await connection.query(
    `
    SELECT order_id, product_id
    FROM orders_products
    WHERE order_id IN (?)`,
    [ordersIds],
  );

  // Extrair os IDs dos produtos dos pedidos encontrados
  const productsIds = ordersProductsResults.map(
    (orderProduct) => orderProduct.product_id,
  );

  // Buscar os detalhes dos produtos
  const [productResults] = await connection.query(
    `
    SELECT id, name, price, image_path
    FROM products
    WHERE id IN (?)`,
    [productsIds],
  );

  // Organizar os produtos por pedido
  const ordersWithProducts = orders.map((order) => {
    // Encontrar os produtos que pertencem ao pedido atual
    const productsForOrder = ordersProductsResults
      .filter((orderProduct) => orderProduct.order_id === order.id) // Filtra os produtos para o pedido atual
      .map((orderProduct) => {
        // Encontre o produto correspondente e adicione os detalhes
        const product = productResults.find(
          (product) => product.id === orderProduct.product_id,
        );
        return product; // Retorna o produto com os detalhes
      });

    return { ...order, products: productsForOrder };
  });

  return { success: true, data: ordersWithProducts };
};

const getOrderFromDB = async (orderId) => {
  const connection = await getDBConnection();
  try {
    const [orderDate] = await connection.query(
      `
      SELECT date
      FROM orders
      WHERE id=?`,
      [orderId],
    );

    const [ordersProductsResult] = await connection.query(
      `
      SELECT order_id, product_id, quantity
      FROM orders_products
      WHERE order_id=?`,
      [orderId],
    );

    if (ordersProductsResult.length === 0) {
      return { success: false, message: 'Pedido não encontrado.' };
    }

    const productId = ordersProductsResult[0].product_id;

    const [productResult] = await connection.query(
      `
      SELECT name, price, image_path
      FROM products
      WHERE id=?`,
      [productId],
    );

    return {
      success: true,
      data: {
        ...ordersProductsResult[0],
        date: orderDate[0].date,
        product: productResult[0],
      },
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
  products,
}) => {
  const connection = await getDBConnection();
  try {
    const [orderResult] = await connection.query(
      `
      INSERT INTO orders (user_id, address_id, date, status)
      VALUES (?, ?, ?, ?)`,
      [user_id, address_id, date, status],
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
        user_id,
        address_id,
        date,
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
};

const updateOrderInDB = async ({ product_id, orderId }) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      UPDATE orders
      SET product_id=?
      WHERE id=?`,
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
  getOrdersUserFromDB,
};
