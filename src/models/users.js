const { getDBConnection } = require('../utils/getDBConnection');

const getAllUsers = async () => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      SELECT * FROM users`,
    );
    return { success: true, data: results };
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao buscar usuários no banco de dados',
    };
  } finally {
    await connection.end();
  }
};

const getUser = async (userId) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      SELECT * FROM users
      JOIN addresses ON users.id = addresses.user_id
      WHERE users.id=?`,
      [userId],
    );
    return { success: true, data: results };
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao buscar usuário no banco de dados',
    };
  } finally {
    await connection.end();
  }
};

const createUser = async ({ name, email }) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      INSERT INTO users (name, email) VALUES (?,?)`,
      [name, email],
    );
    return { success: true, data: results };
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao cadastrar usuário no banco de dados',
    };
  } finally {
    await connection.end();
  }
};

const updateUser = async ({ name, userId }) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      UPDATE users SET name=? WHERE id=?`,
      [name, userId],
    );
    return { success: true, data: results };
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao atualizar usuário no banco de dados',
    };
  } finally {
    await connection.end();
  }
};

const deleteUser = async (userId) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      DELETE FROM users WHERE id=?`,
      [userId],
    );
    return { success: true, data: results };
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao deletar usuário no banco de dados',
    };
  } finally {
    await connection.end();
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
