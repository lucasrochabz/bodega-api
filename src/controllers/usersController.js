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

      if (users.length === 0) {
        return res.status(404).json({ message: 'Usuários não encontrados' });
      }
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
  },

  getUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await getUser(userId);

      if (user.length === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
  },

  createUser: async (req, res) => {
    const { name, email } = req.body;
    try {
      const newUser = await createUser({ name, email });

      if (newUser.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuário não foi cadastrado' });
      }
      res.json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  },

  updateUser: async (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;
    try {
      const updatedUser = await updateUser({ name, userId });

      if (updatedUser.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
  },

  deleteUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await deleteUser(userId);

      if (user.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar usuário' });
    }
  },
};

module.exports = { usersController };
