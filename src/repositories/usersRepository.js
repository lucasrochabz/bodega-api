import executeQuery from '../helpers/databaseQuery.js';

export const usersRepository = {
  verifyUser: async ({ email }) => {
    const query = `
      SELECT id, first_name, password, role FROM users
      WHERE email = ?
    `;
    const params = [email];

    const errorMessage = 'Erro ao verificar usuário no Banco de Dados';

    return await executeQuery(query, params, errorMessage);
  },

  fetchAll: async () => {
    const query = `
      SELECT id, first_name, last_name, email, status
      FROM users
    `;

    const errorMessage = 'Erro ao buscar usuários no Banco de Dados';

    return await executeQuery(query, errorMessage);
  },

  fetchById: async (userId) => {
    const query = `
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
        users.id = ?
    `;
    const params = [userId];

    const errorMessage = 'Erro ao buscar usuário no Banco de Dados';

    return await executeQuery(query, params, errorMessage);
  },

  insertUser: async (user) => {
    const query = `
      INSERT INTO users (first_name, last_name, email, password)
      VALUES (?, ?, ?, ?)
    `;
    const params = [user.first_name, user.last_name, user.email, user.password];

    const errorMessage = 'Erro ao cadastrar usuário no Banco de Dados';

    return await executeQuery(query, params, errorMessage);
  },

  editById: async (userId, userData) => {
    const query = `
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
      WHERE users.id = ?
    `;
    const params = [
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
    ];

    const errorMessage = 'Erro ao atualizar usuário no Banco de Dados';

    return await executeQuery(query, params, errorMessage);
  },

  removeById: async (userId) => {
    const query = `
      DELETE FROM users WHERE id = ?
    `;
    const params = [userId];

    const errorMessage = 'Erro ao deletar usuário no Banco de Dados';

    return await executeQuery(query, params, errorMessage);
  },

  fetchUserAddress: async (userId) => {
    const query = `
      SELECT id
      FROM addresses
      WHERE id = ?
    `;
    const params = [userId];

    const errorMessage = 'Erro ao buscar endereço do usuário no Banco de Dados';

    const results = await executeQuery(query, params, errorMessage);
    return results[0].id;
  },
};
