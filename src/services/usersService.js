import { generateHash } from '../utils/hashUtils.js';
import { addressesRepository } from '../repositories/addressesRepository.js';
import { usersRepository } from '../repositories/usersRepository.js';
import User from '../models/usersModel.js';

export const usersService = {
  getAllUsers: async () => {
    try {
      const users = await usersRepository.findAll();

      if (users.length === 0) {
        return { success: false, message: 'Usuários não encontrados.' };
      }

      return {
        success: true,
        message: 'Usuários encontrados com sucesso.',
        data: users,
      };
    } catch (error) {
      console.error('Erro no Service ao buscar usuários:', error);
      return {
        success: false,
        message: 'Erro no Service ao buscar usuários.',
      };
    }
  },

  getUser: async (userId) => {
    try {
      const userResult = await usersRepository.findByUserId(userId);

      const addressResult = await addressesRepository.findByUserId(userId);

      if (userResult.length === 0 || addressResult.length === 0) {
        return { success: false, message: 'Usuário não encontrado.' };
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
    } catch (error) {
      console.error('Erro no Service ao buscar usuário:', error);
      return {
        success: false,
        message: 'Erro no Service ao buscar usuário.',
      };
    }
  },

  createUser: async (userData) => {
    const hashedPassword = await generateHash(userData.password, 10);
    const user = new User({ ...userData, password: hashedPassword });

    try {
      const newUser = await usersRepository.insert(user);

      const addresses = await addressesRepository.insertAddress(
        newUser.insertId,
        user,
      );

      if (newUser.affectedRows === 0 || addresses.affectedRows === 0) {
        return {
          success: false,
          message: 'Usuário não cadastrado no Banco de Dados.',
        };
      }

      return {
        success: true,
        message: 'Usuário cadastrado com sucesso.',
        data: {
          id: newUser.insertId,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          zip_code: user.zip_code,
          street: user.street,
          number: user.number,
          neighborhood: user.neighborhood,
          city: user.city,
          state: user.state,
        },
      };
    } catch (error) {
      console.error('Erro no Service ao cadastrar usuário:', error);
      return {
        success: false,
        message: 'Erro no Service ao cadastrar usuário.',
      };
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const userUpdated = await usersRepository.updateById(userId, userData);

      if (userUpdated.affectedRows === 0) {
        return { success: false, message: 'Usuário não encontrado.' };
      }

      return {
        success: true,
        message: 'Usuário atualizado com sucesso',
        data: { id: userId, name: userData.name },
      };
    } catch (error) {
      console.error('Erro no Service ao atualizar usuário:', error);
      return {
        success: false,
        message: 'Erro no Service ao atualizar usuário.',
      };
    }
  },

  deleteUser: async (userId) => {
    try {
      const userRemoved = await usersRepository.deleteById(userId);

      if (userRemoved.affectedRows === 0) {
        return { success: false, message: 'Usuário não encontrado.' };
      }

      return {
        success: true,
        message: 'Usuário deletado com sucesso.',
        data: { id: userId },
      };
    } catch (error) {
      console.error('Erro no Service ao deletar usuário:', error);
      return {
        success: false,
        message: 'Erro no Service ao deletar usuário.',
      };
    }
  },
};
