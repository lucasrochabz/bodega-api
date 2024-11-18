const { getDBConnection } = require('../utils/getDBConnection');

const getAllUsersFromDB = async () => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      SELECT * FROM users`,
    );

    if (results.length === 0) {
      return { success: false, message: 'Usuários não encontrados.' };
    }

    return { success: true, data: results };
  } catch (error) {
    console.error('Erro ao buscar usuários no Banco de Dados:', error);
    return {
      success: false,
      message: 'Erro ao buscar usuários no Banco de Dados.',
    };
  } finally {
    await connection.end();
  }
};

const getUserFromDB = async (userId) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      SELECT * FROM users
      JOIN addresses ON users.id = addresses.user_id
      WHERE users.id=?`,
      [userId],
    );

    if (results.length === 0) {
      return { success: false, message: 'Usuário não encontrado.' };
    }

    return { success: true, data: results[0] };
  } catch (error) {
    console.error('Erro ao buscar usuário no Banco de Dados:', error);
    return {
      success: false,
      message: 'Erro ao buscar usuário no Banco de Dados.',
    };
  } finally {
    await connection.end();
  }
};

const createUserInDB = async ({ name, email }) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      INSERT INTO users (name, email) VALUES (?,?)`,
      [name, email],
    );

    if (results.affectedRows === 0) {
      return { success: false, message: 'Usuário não cadastrado.' };
    }

    return {
      success: true,
      data: { id: results.insertId, name, email },
    };
  } catch (error) {
    console.error('Erro ao cadastrar usuário no Banco de Dados:', error);
    return {
      success: false,
      message: 'Erro ao cadastrar usuário no Banco de Dados.',
    };
  } finally {
    await connection.end();
  }
};

const updateUserInDB = async ({ name, userId }) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      UPDATE users SET name=? WHERE id=?`,
      [name, userId],
    );

    if (results.affectedRows === 0) {
      return { success: false, message: 'Usuário não encontrado.' };
    }

    return { success: true, data: { id: userId, name } };
  } catch (error) {
    console.error('Erro ao atualizar usuário no Banco de Dados:', error);
    return {
      success: false,
      message: 'Erro ao atualizar usuário no Banco de Dados.',
    };
  } finally {
    await connection.end();
  }
};

const deleteUserInDB = async (userId) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      DELETE FROM users WHERE id=?`,
      [userId],
    );

    if (results.affectedRows === 0) {
      return { success: false, message: 'Usuário não encontrado.' };
    }

    return { success: true, data: { id: userId } };
  } catch (error) {
    console.error('Erro ao deletar usuário no Banco de Dados:', error);
    return {
      success: false,
      message: 'Erro ao deletar usuário no banco de dados.',
    };
  } finally {
    await connection.end();
  }
};

module.exports = {
  getAllUsersFromDB,
  getUserFromDB,
  createUserInDB,
  updateUserInDB,
  deleteUserInDB,
};
