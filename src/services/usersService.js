import { generateHash } from '../utils/hashUtils.js';
import { addressesRepository } from '../repositories/addressesRepository.js';
import { usersRepository } from '../repositories/usersRepository.js';
import User from '../models/userModel.js';
import Address from '../models/addressModel.js';
import { UsersErrors } from '../errors/usersErrors.js';

export const usersService = {
  getAllUsers: async () => {
    const users = await usersRepository.findAll();

    if (users.length === 0) {
      return {
        success: false,
        error: UsersErrors.USERS_NOT_FOUND,
      };
    }

    return {
      success: true,
      message: 'Usuários encontrados com sucesso.',
      data: users,
    };
  },

  getUser: async (userId) => {
    const userResult = await usersRepository.findByUserId(userId);

    const addressResult = await addressesRepository.findByUserId(userId);

    if (userResult.length === 0 || addressResult.length === 0) {
      return {
        success: false,
        error: UsersErrors.USER_NOT_FOUND,
      };
    }

    const user = {
      ...userResult[0],
      address: addressResult[0],
    };

    return {
      success: true,
      message: 'Usuário encontrado com sucesso.',
      data: user,
    };
  },

  // fix: preciso implementar transaction nessa etapa
  createUser: async (userData) => {
    const hashedPassword = await generateHash(userData.password, 10);

    const user = new User({
      ...userData,
      passwordHash: hashedPassword,
    });

    const result = await usersRepository.insert(user.toPersistence());

    if (result.affectedRows === 0) {
      return {
        success: false,
        error: UsersErrors.USER_NOT_CREATED,
      };
    }

    user.id = result.insertId;

    const address = new Address(userData);
    address.attachToUser(user.id);

    const addressResult = await addressesRepository.insert(
      address.toPersistence(),
    );

    if (addressResult.affectedRows === 0) {
      return { success: false, error: 'ADDRESS_NOT_CREATED' };
    }

    return {
      success: true,
      message: 'Usuário cadastrado com sucesso.',
      data: {
        ...user.toPublic(),
        address: address.toPublic(),
      },
    };
  },

  updateUser: async ({ userId, userData }) => {
    const userUpdated = await usersRepository.updateById({
      userId,
      userData,
    });

    if (userUpdated.affectedRows === 0) {
      return {
        success: false,
        error: UsersErrors.USER_NOT_FOUND,
      };
    }

    return {
      success: true,
      message: 'Usuário atualizado com sucesso',
      data: { id: userId, name: userData.name },
    };
  },

  deleteUser: async (userId) => {
    const userRemoved = await usersRepository.deleteById(userId);

    if (userRemoved.affectedRows === 0) {
      return {
        success: false,
        error: UsersErrors.USER_NOT_FOUND,
      };
    }

    return {
      success: true,
      message: 'Usuário deletado com sucesso.',
      data: { id: userId },
    };
  },
};
