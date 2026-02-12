import { usersService } from '../services/usersService.js';
import { userResDTO } from '../dtos/userResDTO.js';
import { createUserDTO } from '../dtos/createUserDTO.js';
import { handleResponse } from '../helpers/handleResponse.js';
import { handleError } from '../helpers/handleError.js';
import { userListDTO } from '../dtos/userListDTO.js';

export const usersController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await usersService.getAllUsers();
      const result = users.map(userListDTO);

      return handleResponse(
        res,
        { message: 'Usuários encontrados com sucesso.', data: result },
        200,
      );
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return handleError(res, error);
    }
  },

  getUserById: async (req, res) => {
    const { userId } = req.params;
    try {
      const result = await usersService.getUserById(userId);
      const data = userResDTO(result);

      return handleResponse(
        res,
        { message: 'Usuário encontrado com sucesso.', data },
        200,
      );
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return handleError(res, error);
    }
  },

  createUser: async (req, res) => {
    const userData = createUserDTO(req.body);

    try {
      const result = await usersService.createUser(userData);
      return handleResponse(
        res,
        { message: 'Usuário cadastrado com sucesso.', data: result },
        201,
      );
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      return handleError(res, error);
    }
  },

  updateUserById: async (req, res) => {
    const userId = req.user.id;
    const userData = req.body;

    try {
      const result = await usersService.updateUserById({ userId, userData });
      return handleResponse(
        res,
        { message: 'Usuário atualizado com sucesso.', data: result },
        200,
      );
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return handleError(res, error);
    }
  },

  deleteUserById: async (req, res) => {
    const { userId } = req.params;
    try {
      const result = await usersService.deleteUserById(userId);
      return handleResponse(
        res,
        { message: 'Usuário deletado com sucesso.', data: result },
        200,
      );
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      return handleError(res, error);
    }
  },
};
