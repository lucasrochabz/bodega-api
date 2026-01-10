import { usersRepository } from '../repositories/usersRepository.js';
import { addressesRepository } from '../repositories/addressesRepository.js';
import { compareHash, generateHash } from '../utils/hashUtils.js';
import {
  generateResetToken,
  generateToken,
  verifyResetToken,
} from '../utils/tokenUtils.js';
import User from '../models/userModel.js';

export const authService = {
  getMe: async (userId) => {
    const userResult = await usersRepository.findByUserId(userId);
    const addressResult = await addressesRepository.findByUserId(userId);

    if (userResult.length === 0 || addressResult.length === 0) {
      return { success: false, error: 'USER_NOT_FOUND' };
    }

    const userData = {
      ...userResult[0],
      address: addressResult[0],
    };

    return {
      success: true,
      message: 'Usuário encontrado com sucesso.',
      data: userData,
    };
  },

  login: async ({ email, password }) => {
    const user = await usersRepository.findByEmail(email);

    if (user.length === 0) {
      return { success: false, error: 'INVALID_CREDENTIALS' };
    }

    const isPasswordValid = await compareHash(password, user[0].password);

    if (!isPasswordValid) {
      return { success: false, error: 'INVALID_CREDENTIALS' };
    }

    const token = generateToken(new User(user[0]));

    return { success: true, message: 'Login realizado com sucesso.', token };
  },

  forgotPassword: async ({ email, origin }) => {
    const user = await usersRepository.findByEmail(email);

    const [foundUser] = user;

    let resetUrl = null;

    if (foundUser) {
      const token = generateResetToken(foundUser.id);
      resetUrl = `${origin}/reset-password?token=${token}`;
    } else {
      console.info(
        `[FORGOT_PASSWORD] Tentativa para e-mail não cadastrado: ${email}`,
      );
    }

    return {
      success: true,
      message:
        'Se o e-mail estiver cadastrado, você receberá um link para redefinir a senha.',
      resetUrl,
    };
  },

  resetPassword: async ({ token, newPassword }) => {
    const decoded = verifyResetToken(token);
    const userId = decoded.userId;

    const hashedPassword = await generateHash(newPassword, 10);

    const result = await usersRepository.updatePassword({
      hashedPassword,
      userId,
    });

    if (result.affectedRows === 0) {
      return { success: false, error: 'USER_NOT_FOUND' };
    }

    return { success: true, message: 'Senha redefinida com sucesso.' };
  },
};
