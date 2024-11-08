const {
  getAllUsers,
  getOneUser,
  postOneUser,
  deleteOneUser,
} = require('../models/users');

const usersController = {
  listAll: async (req, res) => {
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

  listOne: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await getOneUser(userId);

      if (user.length === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
  },

  createOne: async (req, res) => {
    const { name, email } = req.body;
    try {
      const newUser = await postOneUser(name, email);

      if (newUser.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuário não foi criado' });
      }
      res.json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  },

  deleteOneUser: async (req, res) => {
    const { userId } = req.params;

    const user = await deleteOneUser(userId);
    res.json(user);
  },
};

module.exports = { usersController };
