const { getDBConnection } = require('../database/connection');

const addressesRepository = {
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
