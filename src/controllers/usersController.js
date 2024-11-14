const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../models/users');

const usersController = {
  listAllUsers: async (req, res) => {
    try {
      const users = await getAllUsers();

      if (!users.success) {
        return res.status(404).json({ message: 'Usuários não encontrados' });
      }
      res.json(users.data);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
  },

  getUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await getUser(userId);

      if (!user.success) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json(user.data);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
  },

  createUser: async (req, res) => {
    const { name, email } = req.body;
    try {
      const newUser = await createUser({ name, email });

      if (!newUser.success) {
        return res.status(404).json({ message: 'Usuário não foi cadastrado' });
      }
      res.json(newUser.data);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  },

  updateUser: async (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;
    try {
      const updatedUser = await updateUser({ name, userId });

      if (!updatedUser.success) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json(updatedUser.data);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
  },

  deleteUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await deleteUser(userId);

      if (!user.success) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json(user.data);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar usuário' });
    }
  },
};

module.exports = { usersController };
