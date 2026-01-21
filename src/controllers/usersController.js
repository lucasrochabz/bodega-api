import { usersService } from '../services/usersService.js';
import { handleResponse } from '../helpers/handleResponse.js';
import { createUserDTO } from '../dtos/createUserDTO.js';
import { handleError } from '../helpers/handleError.js';
import { CommonErrors } from '../errors/commonErrors.js';

export const usersController = {
  getAllUsers: async (req, res) => {
    try {
      const usersResult = await usersService.getAllUsers();
      handleResponse(res, usersResult, 200);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return handleError(res, CommonErrors.INTERNAL_SERVER_ERROR);
    }
  },

  getUser: async (req, res) => {
    const userId = req.user.id;
    try {
      const userResult = await usersService.getUser(userId);
      handleResponse(res, userResult, 200);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return handleError(res, CommonErrors.INTERNAL_SERVER_ERROR);
    }
  },

  createUser: async (req, res) => {
    const userData = createUserDTO(req.body);

    try {
      const result = await usersService.createUser(userData);

      handleResponse(res, result, 201);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      return handleError(res, CommonErrors.INTERNAL_SERVER_ERROR);
    }
  },

  updateUser: async (req, res) => {
    const userId = req.user.id;
    const userData = req.body;

    try {
      const updatedUser = await usersService.updateUser({ userId, userData });
      handleResponse(res, updatedUser, 200);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return handleError(res, CommonErrors.INTERNAL_SERVER_ERROR);
    }
  },

  deleteUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const deletedUser = await usersService.deleteUser(userId);
      handleResponse(res, deletedUser, 200);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      return handleError(res, CommonErrors.INTERNAL_SERVER_ERROR);
    }
  },
};
