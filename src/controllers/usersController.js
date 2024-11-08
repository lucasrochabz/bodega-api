const { getAllUsers, getOneUser } = require('../models/users');

const usersController = {
  listAll: async (req, res) => {
    const users = await getAllUsers();
    res.json(users);
  },

  listOne: async (req, res) => {
    const { userId } = req.params;
    const user = await getOneUser(userId);
    res.json(user);
  },
};

module.exports = { usersController };
