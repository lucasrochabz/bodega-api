const { usersRepository } = require('../repositories/usersRepository');

const authService = {
  verifyUserInDB: async ({ email }) => {
    try {
      const user = await usersRepository.verifyUser({ email });

      if (user.length === 0) {
        return { success: false, message: 'E-mail ou senha incorretos.' };
      }

      return { success: true, data: user[0] };
    } catch (error) {
      console.error('Erro ao buscar usuário no Banco de Dados:', error);
      return {
        success: false,
        message: 'Erro ao buscar usuário no Banco de Dados.',
      };
    }
  },
};

module.exports = { authService };
