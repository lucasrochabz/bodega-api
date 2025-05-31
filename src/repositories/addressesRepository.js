import executeQuery from '../helpers/databaseQuery.js';

export const addressesRepository = {
  fetchAddressById: async (addressId) => {
    const query = `
      SELECT street, number, neighborhood, city, state, zip_code
      FROM addresses
      WHERE addresses.id = ?
    `;
    const params = [addressId];

    const errorMessage =
      'Erro ao buscar o endereço do usuário no Banco de Dados';

    const results = await executeQuery(query, params, errorMessage);
    return results[0];
  },

  insertAddress: async (userId, user) => {
    const query = `
      INSERT INTO addresses (user_id, street, number, neighborhood, city, state, zip_code)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      userId,
      user.street,
      user.number,
      user.neighborhood,
      user.city,
      user.state,
      user.zip_code,
    ];

    const errorMessage =
      'Erro ao cadastrar endereço do usuário no Banco de Dados';

    return await executeQuery(query, params, errorMessage);
  },
};
