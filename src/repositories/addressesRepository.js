import executeQuery from '../helpers/executeQuery.js';

export const addressesRepository = {
  findById: async (addressId) => {
    const query = `
      SELECT street, number, neighborhood, city, state, zip_code
      FROM addresses
      WHERE id = ?
    `;
    const params = [addressId];

    const errorMessage =
      'Erro ao buscar o endereço do usuário no Banco de Dados';

    const results = await executeQuery(query, params, errorMessage);
    return results[0];
  },

  findByUserId: async (userId) => {
    const query = `
    SELECT street, number, neighborhood, city, state, zip_code
    FROM addresses
    WHERE user_id = ?
    `;
    const params = [userId];

    const errorMessage =
      'Erro ao buscar o endereço do usuário no Banco de Dados';

    return await executeQuery(query, params, errorMessage);
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

    const errorMessage =
      'Erro ao cadastrar endereço do usuário no Banco de Dados';

    return await executeQuery(query, params, errorMessage);
  },
};
