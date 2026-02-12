import executeQuery from '../database/executeQuery.js';

export const addressesRepository = {
  // fix: resolver como vai ficar isso aqui separar responsabilidades
  findById: async (addressId) => {
    const query = `
    SELECT id, street, number, neighborhood, city, state, zip_code
    FROM addresses
    WHERE id = ?
    `;
    const params = [addressId];

    const rows = await executeQuery(query, params);
    return rows[0] || null;
  },

  findByUserId: async (userId) => {
    const query = `
      SELECT id, street, number, neighborhood, city, state, zip_code
      FROM addresses
      WHERE user_id = ?
    `;
    const params = [userId];

    const rows = await executeQuery(query, params);
    return rows[0] || null;
  },

  insert: async (addressData) => {
    const query = `
      INSERT INTO addresses (user_id, street, number, neighborhood, city, state, zip_code)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      addressData.user_id,
      addressData.street,
      addressData.number,
      addressData.neighborhood,
      addressData.city,
      addressData.state,
      addressData.zip_code,
    ];

    const result = await executeQuery(query, params);
    return result;
  },
};
