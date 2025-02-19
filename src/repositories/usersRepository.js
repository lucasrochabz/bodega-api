const { getDBConnection } = require('../database/connection');

const usersRepository = {
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
