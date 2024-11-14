const { getDBConnection } = require('../utils/getDBConnection');

const getAllProducts = async () => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `SELECT * from products
      `,
    );
    return { success: true, data: results };
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao buscar produtos no banco de dados',
    };
  } finally {
    await connection.end();
  }
};

const getProduct = async (productId) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      SELECT * FROM products WHERE id=?`,
      [productId],
    );
    return { success: true, data: results };
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao buscar produto no banco de dados',
    };
  } finally {
    await connection.end();
  }
};

const createProduct = async ({ name, price, description, stock }) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      INSERT INTO products (name, price, description, stock) VALUES (?, ?, ?, ?)`,
      [name, price, description, stock],
    );
    return { success: true, data: results };
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao cadastrar produto no banco de dados',
    };
  } finally {
    await connection.end();
  }
};

const updateProduct = async ({ description, productId }) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      UPDATE products SET description=? WHERE id=?`,
      [description, productId],
    );
    return { success: true, data: results };
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao atualizar produto no banco de dados',
    };
  } finally {
    await connection.end();
  }
};

const deleteProduct = async (productId) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      DELETE FROM products WHERE id=?`,
      [productId],
    );
    return { success: true, data: results };
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao deletar produto no banco de dados',
    };
  } finally {
    await connection.end();
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
