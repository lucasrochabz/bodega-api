const bcrypt = require('bcrypt');
const { verifyUserInDB } = require('../models/authsModel');

const authsController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await verifyUserInDB({ email, password });

      if (!user.success) {
        return res.status(404).json({
          success: false,
          message: user.message,
        });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user.data.password,
      );

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Dados inválidos',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Login realizado com sucesso.',
        data: user.data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao realizar login.',
      });
    }
  },
};

module.exports = { authsController };
