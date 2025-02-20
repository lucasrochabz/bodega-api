const { getDBConnection } = require('../database/connection');

const addressesRepository = {
  fetchAddressById: async (addressId) => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        SELECT street, number, neighborhood, city, state, zip_code
        FROM addresses
        WHERE addresses.id = ?`,
        [addressId],
      );

      return results[0];
    } catch (error) {
      console.error(
        'Erro ao buscar o endereço do usuário no Banco de Dados',
        error,
      );
      throw new Error('Erro ao buscar o endereço do usuário no Banco de Dados');
    } finally {
      await connection.end();
    }
  },

  insertAddress: async (userId, user) => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        INSERT INTO addresses (user_id, street, number, neighborhood, city, state, zip_code)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          user.street,
          user.number,
          user.neighborhood,
          user.city,
          user.state,
          user.zip_code,
        ],
      );

      return results;
    } catch (error) {
      console.error(
        'Erro ao cadastrar endereço do usuário no Banco de Dados',
        error,
      );
      throw new Error(
        'Erro ao cadastrar endereço do usuário no Banco de Dados',
      );
    } finally {
      await connection.end();
    }
  },
};

module.exports = { addressesRepository };
