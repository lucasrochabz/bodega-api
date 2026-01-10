import executeQuery from '../helpers/executeQuery.js';

export const usersRepository = {
  findByEmail: async (email) => {
    const query = `
      SELECT id, first_name, password, role FROM users
      WHERE email = ?
    `;
    const params = [email];

    return await executeQuery(query, params);
  },

  findAll: async () => {
    const query = `
      SELECT id, first_name, last_name, email, status
      FROM users
    `;

    return await executeQuery(query);
  },

  findByUserId: async (userId) => {
    const query = `
      SELECT id, first_name, last_name, email
      FROM users 
      WHERE
        users.id = ?
    `;
    const params = [userId];

    return await executeQuery(query, params);
  },

  insert: async (user) => {
    const query = `
      INSERT INTO users (first_name, last_name, email, password)
      VALUES (?, ?, ?, ?)
    `;
    const params = [user.first_name, user.last_name, user.email, user.password];

    return await executeQuery(query, params);
  },

  updateById: async ({ userId, userData }) => {
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
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.zipCode,
      userData.street,
      userData.number,
      userData.neighborhood,
      userData.city,
      userData.state,
      userId,
    ];

    return await executeQuery(query, params);
  },

  updatePassword: async ({ hashedPassword, userId }) => {
    const query = `
      UPDATE users
      SET password = ?
      WHERE id = ?
    `;

    const params = [hashedPassword, userId];

    return await executeQuery(query, params);
  },

  deleteById: async (userId) => {
    const query = `
      DELETE FROM users WHERE id = ?
    `;
    const params = [userId];

    return await executeQuery(query, params);
  },

  findAddressByUserId: async (userId) => {
    const query = `
      SELECT id
      FROM addresses
      WHERE user_id = ?
    `;
    const params = [userId];

    const results = await executeQuery(query, params);
    return results[0].id;
  },
};
