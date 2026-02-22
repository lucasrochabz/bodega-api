import { generateHash } from '../utils/hashUtils.js';
import { addressesRepository } from '../repositories/addressesRepository.js';
import { usersRepository } from '../repositories/usersRepository.js';
import User from '../entities/userEntity.js';
import Address from '../entities/addressEntity.js';
import { UsersErrors } from '../errors/usersErrors.js';

export const usersService = {
  getAllUsers: async () => {
    const users = await usersRepository.findAll();

    if (users.length === 0) {
      throw UsersErrors.USERS_NOT_FOUND;
    }

    return users;
  },

  getUserById: async (userId) => {
    const user = await usersRepository.findById(userId);
    const address = await addressesRepository.findByUserId(userId);

    if (!user || !address) {
      throw UsersErrors.USER_NOT_FOUND;
    }

    return {
      ...user,
      address: address,
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
      throw UsersErrors.USER_NOT_CREATED;
    }

    user.id = result.insertId;

    const address = new Address(userData);
    address.attachToUser(user.id);

    const addressResult = await addressesRepository.insert(
      address.toPersistence(),
    );

    if (addressResult.affectedRows === 0) {
      throw UsersErrors.USER_ADDRESS_NOT_CREATED;
    }

    return {
      ...user.toPublic(),
      address: address.toPublic(),
    };
  },

  updateUserById: async ({ userId, userData }) => {
    const userUpdated = await usersRepository.updateById({
      userId,
      userData,
    });

    if (userUpdated.affectedRows === 0) {
      throw UsersErrors.USER_NOT_FOUND;
    }

    return {
      id: userId,
      name: userData.name,
    };
  },

  // fix: essa função não deve retornar nada (observar outras funções de delete)
  deleteUserById: async (userId) => {
    const userDeleted = await usersRepository.deleteById(userId);

    if (userDeleted.affectedRows === 0) {
      throw UsersErrors.USER_NOT_FOUND;
    }

    return {
      id: userId,
    };
  },
};
