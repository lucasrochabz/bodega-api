import { usersService } from '../services/usersService.js';
import { handleServiceResponse } from '../helpers/handleServiceResponse.js';
import { UsersErrors } from '../errors/usersErrors.js';
import { CommonErrors } from '../errors/commonErrors.js';

export const usersController = {
  getAllUsers: async (req, res) => {
    try {
      const usersResult = await usersService.getAllUsers();
      handleServiceResponse(res, usersResult, 200, UsersErrors);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);

      const { statusCode, message } = CommonErrors.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).json({
        success: false,
        message,
      });
    }
  },

  getUser: async (req, res) => {
    const userId = req.user.id;
    try {
      const userResult = await usersService.getUser(userId);
      handleServiceResponse(res, userResult, 200, UsersErrors);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);

      const { statusCode, message } = CommonErrors.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).json({
        success: false,
        message,
      });
    }
  },

  createUser: async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      password,
      zipCode,
      street,
      number,
      neighborhood,
      city,
      state,
    } = req.body;
    // fix: const userData = createUserDTO(req.body)

    try {
      const result = await usersService.createUser({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        zip_code: zipCode,
        street,
        number,
        neighborhood,
        city,
        state,
      });

      handleServiceResponse(res, result, 201, UsersErrors);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);

      const { statusCode, message } = CommonErrors.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).json({
        success: false,
        message,
      });
    }
  },

  updateUser: async (req, res) => {
    const userId = req.user.id;
    const userData = req.body;

    try {
      const updatedUser = await usersService.updateUser({ userId, userData });
      handleServiceResponse(res, updatedUser, 200, 404);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar usuário.',
      });
    }
  },

  deleteUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const deletedUser = await usersService.deleteUser(userId);
      handleServiceResponse(res, deletedUser, 200, UsersErrors);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);

      const { statusCode, message } = CommonErrors.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).json({
        success: false,
        message,
      });
    }
  },
};
