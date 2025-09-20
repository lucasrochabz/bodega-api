import { usersService } from '../services/usersService.js';

export const usersController = {
  getAllUsers: async (req, res) => {
    try {
      const usersResult = await usersService.getAllUsers();

      if (!usersResult.success) {
        return res.status(404).json(usersResult);
      }

      res.status(200).json(usersResult);
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

      if (!userResult.success) {
        return res.status(404).json(userResult);
      }

      res.status(200).json(userResult);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar usuário.',
      });
    }
  },

  createUser: async (req, res) => {
    try {
      const result = await usersService.createUser(req.body);

      if (!result.success) {
        return res.status(404).json(result);
      }

      res.status(201).json(result);
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
      const updatedUser = await usersService.updateUser(userId, userData);

      if (!updatedUser.success) {
        return res.status(404).json(updatedUser);
      }

      res.status(200).json(updatedUser);
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

      if (!deletedUser.success) {
        return res.status(404).json(deletedUser);
      }

      res.status(200).json(deletedUser);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar usuário.',
      });
    }
  },
};
