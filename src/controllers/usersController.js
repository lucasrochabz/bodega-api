const {
  getAllUsersFromDB,
  getUserFromDB,
  createUserInDB,
  updateUserInDB,
  deleteUserInDB,
} = require('../models/users');

const usersController = {
  listAllUsers: async (req, res) => {
    try {
      const users = await getAllUsersFromDB();

      if (!users.success) {
        return res.status(404).json({ success: false, message: users.message });
      }

      res.status(200).json({ success: true, data: users.data });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Erro ao buscar usuários' });
    }
  },

  getUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await getUserFromDB(userId);

      if (!user.success) {
        return res.status(404).json({ success: false, message: user.message });
      }

      res.status(200).json({ success: true, data: user.data });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Erro ao buscar usuário' });
    }
  },

  createUser: async (req, res) => {
    const { name, email } = req.body;
    try {
      const newUser = await createUserInDB({ name, email });

      if (!newUser.success) {
        return res
          .status(404)
          .json({ success: false, message: newUser.message });
      }

      res.status(201).json({ success: true, data: newUser.data });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Erro ao criar usuário' });
    }
  },

  updateUser: async (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;
    try {
      const updatedUser = await updateUserInDB({ name, userId });

      if (!updatedUser.success) {
        return res
          .status(404)
          .json({ success: false, message: 'Usuário não encontrado' });
      }

      res.status(200).json({ success: true, data: updatedUser.data });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Erro ao atualizar usuário' });
    }
  },

  deleteUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const deletedUser = await deleteUserInDB(userId);

      if (!deletedUser.success) {
        return res
          .status(404)
          .json({ success: false, message: 'Usuário não encontrado' });
      }

      res.status(200).json({ success: true, data: deletedUser.data });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Erro ao deletar usuário' });
    }
  },
};

module.exports = { usersController };
