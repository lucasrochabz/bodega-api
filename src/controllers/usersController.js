import { usersService } from '../services/usersService.js';
import { handleResponse } from '../helpers/handleResponse.js';
import { createUserDTO } from '../dtos/createUserDTO.js';
import { handleError } from '../helpers/handleError.js';

export const usersController = {
  getAllUsers: async (req, res) => {
    try {
      const result = await usersService.getAllUsers();
      handleResponse(
        res,
        { message: 'Usuários encontrados com sucesso.', data: result },
        200,
      );
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return handleError(res, error);
    }
  },

  getUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const result = await usersService.getUser(userId);
      handleResponse(
        res,
        { message: 'Usuário encontrado com sucesso.', data: result },
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
      handleResponse(
        res,
        { message: 'Usuário cadastrado com sucesso.', data: result },
        201,
      );
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      return handleError(res, error);
    }
  },

  updateUser: async (req, res) => {
    const userId = req.user.id;
    const userData = req.body;

    try {
      const result = await usersService.updateUser({ userId, userData });
      handleResponse(
        res,
        { message: 'Usuário atualizado com sucesso', data: result },
        200,
      );
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return handleError(res, error);
    }
  },

  deleteUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const result = await usersService.deleteUser(userId);
      handleResponse(
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
