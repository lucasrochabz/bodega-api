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
      console.error('Erro no Service ao verificar usuário:', error);
      return {
        success: false,
        message: 'Erro no Service ao verificar usuário.',
      };
    }
  },
};

module.exports = { authService };
