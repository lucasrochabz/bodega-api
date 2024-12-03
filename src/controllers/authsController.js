const { getUserFromDB } = require('../models/usersModel');

const authsController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await getUserFromDB({ email, password });

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
};

module.exports = { authsController };
