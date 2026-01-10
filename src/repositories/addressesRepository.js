import executeQuery from '../helpers/executeQuery.js';

export const addressesRepository = {
  findById: async (addressId) => {
    const query = `
      SELECT street, number, neighborhood, city, state, zip_code
      FROM addresses
      WHERE id = ?
    `;
    const params = [addressId];

    const results = await executeQuery(query, params);
    return results[0];
  },

  findByUserId: async (userId) => {
    const query = `
    SELECT street, number, neighborhood, city, state, zip_code
    FROM addresses
    WHERE user_id = ?
    `;
    const params = [userId];

    return await executeQuery(query, params);
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

    return await executeQuery(query, params);
  },
};
