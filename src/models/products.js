const { getDBConnection } = require('../utils/getDBConnection');

const getAllProductsFromDB = async () => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      SELECT * from products`,
    );

    if (results.length === 0) {
      return { success: false, message: 'Produtos não encontrados' };
    }

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

const getProductFromDB = async (productId) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      SELECT * FROM products WHERE id=?`,
      [productId],
    );

    if (results.length === 0) {
      return { success: false, message: 'Produto não encontrado' };
    }

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

const createProductInDB = async ({ name, price, description, stock }) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      INSERT INTO products (name, price, description, stock) VALUES (?, ?, ?, ?)`,
      [name, price, description, stock],
    );

    if (results.affectedRows === 0) {
      return { success: false, message: 'Produto não foi cadastrado' };
    }

    return {
      success: true,
      data: { id: results.insertId, name, price, description, stock },
    };
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao cadastrar produto no banco de dados',
    };
  } finally {
    await connection.end();
  }
};

const updateProductInDB = async ({ description, productId }) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      UPDATE products SET description=? WHERE id=?`,
      [description, productId],
    );

    if (results.affectedRows === 0) {
      return { success: false, message: 'Produto não encontrado' };
    }

    return { success: true, data: { id: productId, description } };
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao atualizar produto no banco de dados',
    };
  } finally {
    await connection.end();
  }
};

const deleteProductInDB = async (productId) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      DELETE FROM products WHERE id=?`,
      [productId],
    );

    if (results.affectedRows === 0) {
      return { success: false, message: 'Produto não encontrado' };
    }

    return { success: true, data: { id: productId } };
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
  getAllProductsFromDB,
  getProductFromDB,
  createProductInDB,
  updateProductInDB,
  deleteProductInDB,
};
