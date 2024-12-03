const { getUserFromDB } = require('../models/usersModel');

const authsController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await getUserFromDB({ email, password });
    res.json(user);
  },
};

module.exports = { authsController };
