import { usersRepository } from '../repositories/usersRepository.js';
import { addressesRepository } from '../repositories/addressesRepository.js';
import { compareHash, generateHash } from '../utils/hashUtils.js';
import {
  generateResetToken,
  generateToken,
  verifyResetToken,
} from '../utils/tokenUtils.js';
import User from '../models/userModel.js';
import { AuthErrors } from '../errors/authErrors.js';
import { UsersErrors } from '../errors/usersErrors.js';

export const authService = {
  getMe: async (userId) => {
    const user = await usersRepository.findByUserId(userId);
    const address = await addressesRepository.findByUserId(userId);

    if (user.length === 0 || address.length === 0) {
      throw UsersErrors.USER_NOT_FOUND;
    }

    const userData = {
      ...user[0],
      address: address[0],
    };

    return userData;
  },

  login: async ({ email, password }) => {
    const user = await usersRepository.findByEmail(email);

    if (user.length === 0) {
      throw AuthErrors.INVALID_CREDENTIALS;
    }

    const isPasswordValid = await compareHash(password, user[0].password);

    if (!isPasswordValid) {
      throw AuthErrors.INVALID_CREDENTIALS;
    }

    const token = generateToken(new User(user[0]));

    return token;
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
