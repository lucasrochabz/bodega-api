const bcrypt = require('bcrypt');
const {
  getAllUsersFromDB,
  getUserFromDB,
  createUserInDB,
  updateUserInDB,
  deleteUserInDB,
} = require('../models/usersModel');

const usersController = {
  listAllUsers: async (req, res) => {
    try {
      const users = await getAllUsersFromDB();

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
      const user = await getUserFromDB(userId);

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
    const saltRounds = 10;

    const generateHash = async (passwordValue, saltRounds) => {
      try {
        const hashPassword = await bcrypt.hash(passwordValue, saltRounds);
        return hashPassword;
      } catch (error) {
        console.error('Erro ao gerar o hash:', error);
      }
    };

    try {
      const hashedPassword = await generateHash(password, saltRounds);
      const newUser = await createUserInDB({
        name,
        email,
        hashedPassword,
        street,
        number,
        neighborhood,
        city,
        state,
        zip_code,
      });

      if (!newUser.success) {
        return res.status(404).json({
          success: false,
          message: newUser.message,
        });
      }

      res.status(201).json({
        success: true,
        message: 'Usuário cadastrado com sucesso.',
        data: newUser.data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao criar usuário.',
      });
    }
  },

  updateUser: async (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;
    try {
      const updatedUser = await updateUserInDB({ name, userId });

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
      const deletedUser = await deleteUserInDB(userId);

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
