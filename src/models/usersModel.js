const { getDBConnection } = require('../config/database');

const getAllUsersFromDB = async () => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      SELECT id, name, email, password, status
      FROM users`,
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

const verifyUserInDB = async ({ email, password }) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      SELECT id, name FROM users
      WHERE email=?
      AND password=?`,
      [email, password],
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

const getUserFromDB = async (userId) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      SELECT
        users.id,
        users.name,
        users.email,
        addresses.street,
        addresses.number,
        addresses.neighborhood,
        addresses.city,
        addresses.state
      FROM
        users 
      JOIN
        addresses ON users.id = addresses.user_id
      WHERE
        users.id=?`,
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
      message: 'Erro ao buscar usuário no Banco de Dados',
    };
  } finally {
    await connection.end();
  }
};

const createUserInDB = async ({ name, email, hashedPassword }) => {
  const connection = await getDBConnection();
  try {
    const [results] = await connection.query(
      `
      INSERT INTO users (name, email, password)
      VALUES (?, ?, ?)`,
      [name, email, hashedPassword],
    );

    if (results.affectedRows === 0) {
      return { success: false, message: 'Usuário não cadastrado.' };
    }

    return {
      success: true,
      data: { id: results.insertId, name, email, hashedPassword },
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
      UPDATE users
      SET name=?
      WHERE id=?`,
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
  verifyUserInDB,
  getUserFromDB,
  createUserInDB,
  updateUserInDB,
  deleteUserInDB,
};
