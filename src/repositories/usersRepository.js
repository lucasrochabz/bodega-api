const { getDBConnection } = require('../database/connection');
const executeQuery = require('../helpers/databaseQuery');

const usersRepository = {
  verifyUser: async ({ email }) => {
    const query = `
      SELECT id, first_name, passwor, role FROM users
      WHERE email = ?`;

    const errorMessage = 'Erro ao verificar usuário no Banco de Dados';

    return await executeQuery(query, [email], errorMessage);
  },

  fetchAll: async () => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        SELECT id, first_name, last_name, email, status
        FROM users`,
      );

      return results;
    } catch (error) {
      console.error('Erro ao buscar usuários no Banco de Dados:', error);
      throw new Error('Erro ao buscar usuários no Banco de Dados.');
    } finally {
      await connection.end();
    }
  },

  fetchById: async (userId) => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        SELECT
          users.id,
          users.first_name,
          users.last_name,
          users.email,
          addresses.street,
          addresses.number,
          addresses.neighborhood,
          addresses.city,
          addresses.state,
          addresses.zip_code
        FROM
          users 
        JOIN
          addresses ON users.id = addresses.user_id
        WHERE
          users.id = ?`,
        [userId],
      );

      return results;
    } catch (error) {
      console.error('Erro ao buscar usuário no Banco de Dados:', error);
      throw new Error('Erro ao buscar usuário no Banco de Dados.');
    } finally {
      await connection.end();
    }
  },

  insertUser: async (user) => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        INSERT INTO users (first_name, last_name, email, password)
        VALUES (?, ?, ?, ?)`,
        [user.first_name, user.last_name, user.email, user.password],
      );

      return results;
    } catch (error) {
      console.error('Erro ao cadastrar usuário no Banco de Dados:', error);
      throw new Error('Erro ao cadastrar usuário no Banco de Dados.');
    } finally {
      await connection.end();
    }
  },

  editById: async (userId, userData) => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        UPDATE users
        JOIN
          addresses ON users.id = addresses.user_id
        SET
          users.first_name = ?,
          users.last_name = ?,
          users.email = ?,
          addresses.zip_code = ?,
          addresses.street = ?,
          addresses.number = ?,
          addresses.neighborhood = ?,
          addresses.city = ?,
          addresses.state = ?
        WHERE users.id = ?`,
        [
          userData.first_name,
          userData.last_name,
          userData.email,
          userData.zip_code,
          userData.street,
          userData.number,
          userData.neighborhood,
          userData.city,
          userData.state,
          userId,
        ],
      );

      return results;
    } catch (error) {
      console.error('Erro ao atualizar usuário no Banco de Dados:', error);
      throw new Error('Erro ao atualizar usuário no Banco de Dados.');
    } finally {
      await connection.end();
    }
  },

  removeById: async (userId) => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        DELETE FROM users WHERE id = ?`,
        [userId],
      );

      return results;
    } catch (error) {
      console.error('Erro ao deletar usuário no Banco de Dados:', error);
      throw new Error('Erro ao deletar usuário no Banco de Dados');
    } finally {
      await connection.end();
    }
  },

  fetchUserAddress: async (userId) => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        SELECT id
        FROM addresses
        WHERE id = ?`,
        [userId],
      );

      return results[0].id;
    } catch (error) {
      console.error(
        'Erro ao buscar endereço do usuário no Banco de Dados:',
        error,
      );
      throw new Error('Erro ao buscar endereço do usuário no Banco de Dados.');
    } finally {
      await connection.end();
    }
  },
};

module.exports = { usersRepository };
