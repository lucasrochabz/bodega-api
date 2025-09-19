import { usersRepository } from '../repositories/usersRepository.js';
import { compareHash } from '../utils/hashUtils.js';
import { generateToken } from '../utils/tokenUtils.js';
import User from '../models/usersModel.js';

export const authService = {
  login: async ({ email, password }) => {
    try {
      const user = await usersRepository.findByEmail(email);

      if (user.length === 0) {
        return { success: false, message: 'E-mail ou senha incorretos.' };
      }

      const isPasswordValid = await compareHash(password, user[0].password);

      if (!isPasswordValid) {
        return { success: false, message: 'E-mail ou senha incorretos' };
      }

      const token = generateToken(new User(user[0]));

      return { success: true, message: 'Login realizado com sucesso.', token };
    } catch (error) {
      console.error('Erro no Service ao verificar usuário:', error);
      return {
        success: false,
        message: 'Erro no Service ao verificar usuário.',
      };
    }
  },
};
