const { getDBConnection } = require('../database/connection');

const authService = {
  verifyUserInDB: async ({ email }) => {
    const connection = await getDBConnection();
    try {
      const [results] = await connection.query(
        `
        SELECT id, first_name, password, role FROM users
        WHERE email = ?`,
        [email],
      );

      if (results.length === 0) {
        return { success: false, message: 'E-mail ou senha incorretos.' };
      }

      return { success: true, data: results[0] };
    } catch (error) {
      console.error('Erro ao buscar usuário no Banco de Dados:', error);
      return {
        success: false,
        message: 'Erro ao buscar usuário no Banco de Dados.',
      };
    } finally {
      await connection.end();
    }
  },
};

module.exports = { authService };
