import { usersRepository } from '../repositories/usersRepository.js';
import { compareHash, generateHash } from '../utils/hashUtils.js';
import {
  generateResetToken,
  generateToken,
  verifyResetToken,
} from '../utils/tokenUtils.js';
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
        return { success: false, message: 'E-mail ou senha incorretos.' };
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

  forgotPassword: async (email) => {
    try {
      const user = await usersRepository.findByEmail(email);

      if (user.length === 0) {
        return {
          success: false,
          message:
            'Se o email estiver cadastrado, você receberá um link para redefinir a senha.',
        };
      }

      const token = generateResetToken(user[0].id);

      const resetUrl = `${process.env.ALLOWED_ORIGINS}/reset-password?token=${token}`;

      return {
        success: true,
        message: 'Link de redefinição de senha gerado com sucesso.',
        resetUrl,
      };
    } catch (error) {
      console.error(
        'Erro no Service ao solicitar a recuperação de senha:',
        error,
      );
      return {
        success: false,
        message: 'Erro no Service ao solicitar a recuperação de senha.',
      };
    }
  },

  resetPassword: async ({ token, newPassword }) => {
    try {
      const decoded = verifyResetToken(token);
      const userId = decoded.userId;

      const hashedPassword = await generateHash(newPassword, 10);

      const result = await usersRepository.updatePassword({
        hashedPassword,
        userId,
      });

      if (result.affectedRows === 0) {
        return { success: false, message: 'Usuário não encontrado.' };
      }

      return { success: true, message: 'Senha redefinida com sucesso.' };
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      return {
        success: false,
        message: 'Erro ao redefinir senha.',
      };
    }
  },
};
