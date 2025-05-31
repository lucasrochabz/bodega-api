import { generateHash } from '../utils/hashUtils.js';
import { usersService } from '../services/usersService.js';
import User from '../models/usersModel.js';

export const usersController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await usersService.fetchAllUsers();

      if (!users.success) {
        return res.status(404).json({
          success: false,
          message: users.message,
        });
      }

      res.status(200).json({
        success: true,
        message: 'Usuários encontrados com sucesso.',
        data: users.data,
      });
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
      const user = await usersService.fetchUser(userId);

      if (!user.success) {
        return res.status(404).json({
          success: false,
          message: user.message,
        });
      }

      res.status(200).json({
        success: true,
        message: 'Usuário encontrado com sucesso.',
        data: user.data,
      });
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
      first_name,
      email,
      last_name,
      password,
      zip_code,
      street,
      number,
      neighborhood,
      city,
      state,
    } = req.body;

    try {
      const hashedPassword = await generateHash(password, 10);
      const newUser = new User({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        street,
        number,
        neighborhood,
        city,
        state,
        zip_code,
      });

      const result = await usersService.registerUser(newUser);

      if (!result.success) {
        return res.status(404).json({
          success: false,
          message: result.message,
        });
      }

      res.status(201).json({
        success: true,
        message: 'Usuário cadastrado com sucesso.',
        data: result.data,
      });
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
      const updatedUser = await usersService.editUser(userId, userData);

      if (!updatedUser.success) {
        return res.status(404).json({
          success: false,
          message: updatedUser.message,
        });
      }

      res.status(200).json({
        success: true,
        message: 'Usuário atualizado com sucesso',
        data: updatedUser.data,
      });
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
      const deletedUser = await usersService.removeUser(userId);

      if (!deletedUser.success) {
        return res.status(404).json({
          success: false,
          message: deletedUser.message,
        });
      }

      res.status(200).json({
        success: true,
        message: 'Usuário deletado com sucesso.',
        data: deletedUser.data,
      });
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar usuário.',
      });
    }
  },
};
