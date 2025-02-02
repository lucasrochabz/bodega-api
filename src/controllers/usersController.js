const { generateHash } = require('../utils/hash');
const { usersService } = require('../services/usersService');
const User = require('../models/usersModel');

const usersController = {
  listAllUsers: async (req, res) => {
    try {
      const users = await usersService.getAllUsersFromDB();

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
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar usuários.',
      });
    }
  },

  getUser: async (req, res) => {
    const userId = req.user.id;
    try {
      const user = await usersService.getUserFromDB(userId);

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
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar usuário.',
      });
    }
  },

  createUser: async (req, res) => {
    const {
      name,
      email,
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
        name,
        email,
        password: hashedPassword,
        street,
        number,
        neighborhood,
        city,
        state,
        zip_code,
      });

      const result = await usersService.createUserInDB(newUser);

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
      res.status(500).json({
        success: false,
        message: 'Erro ao cadastrar usuário.',
      });
    }
  },

  updateUser: async (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;
    try {
      const updatedUser = await usersService.updateUserInDB({ name, userId });

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
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar usuário.',
      });
    }
  },

  deleteUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const deletedUser = await usersService.deleteUserInDB(userId);

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
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar usuário.',
      });
    }
  },
};

module.exports = { usersController };
