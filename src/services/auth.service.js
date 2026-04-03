import { usersRepository } from '../repositories/users.repository.js';
import { addressesRepository } from '../repositories/addresses.repository.js';
import { compareHash, generateHash } from '../shared/utils/hash.utils.js';
import {
  generateResetToken,
  generateToken,
  verifyResetToken,
} from '../shared/utils/token.utils.js';
import User from '../entities/user.entity.js';
import { AuthErrors } from '../shared/errors/authErrors.js';
import { UsersErrors } from '../shared/errors/usersErrors.js';

export const authService = {
  getMe: async (userId) => {
    const user = await usersRepository.findById(userId);
    const address = await addressesRepository.findByUserId(userId);

    if (!user || !address) {
      throw UsersErrors.USER_NOT_FOUND;
    }

    const userData = {
      ...user,
      address: address,
    };

    return userData;
  },

  login: async ({ email, password }) => {
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw AuthErrors.INVALID_CREDENTIALS;
    }

    const isPasswordValid = await compareHash(password, user.password);

    if (!isPasswordValid) {
      throw AuthErrors.INVALID_CREDENTIALS;
    }

    // fix: corrigir isso depois
    // const name = 'Usuário';
    // emailService.sendWelcomeEmail(email, name);
    const token = generateToken(new User(user));
    return token;
  },

  forgotPassword: async ({ email, origin }) => {
    const user = await usersRepository.findByEmail(email);

    let resetUrl = null;

    if (user) {
      const token = generateResetToken(user.id);
      resetUrl = `${origin}/reset-password?token=${token}`;
    } else {
      console.info(
        `[FORGOT_PASSWORD] Tentativa para e-mail não cadastrado: ${email}`,
      );
    }

    return resetUrl;
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
      throw UsersErrors.USER_NOT_FOUND;
    }

    return;
  },
};
