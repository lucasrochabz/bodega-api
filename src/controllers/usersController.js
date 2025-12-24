import { usersService } from '../services/usersService.js';
import { handleServiceResponse } from '../helpers/handleServiceResponse.js';

export const usersController = {
  getAllUsers: async (req, res) => {
    try {
      const usersResult = await usersService.getAllUsers();
      handleServiceResponse(res, usersResult, 200, 404);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar usuários.',
      });
    }
  },

  getUser: async (req, res) => {
    const userId = req.user.id;
    try {
      const userResult = await usersService.getUser(userId);
      handleServiceResponse(res, userResult, 200, 404);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar usuário.',
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

      handleServiceResponse(res, result, 201, 404);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao cadastrar usuário.',
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
      handleServiceResponse(res, deletedUser, 200, 404);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar usuário.',
      });
    }
  },
};
