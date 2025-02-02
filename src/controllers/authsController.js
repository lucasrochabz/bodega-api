const jwt = require('jsonwebtoken');
const { compareHash } = require('../utils/hash');
const { authsService } = require('../services/authsService');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const authsController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await authsService.verifyUserInDB({ email });

      if (!user.success) {
        return res.status(404).json({
          success: false,
          message: user.message,
        });
      }

      const isPasswordValid = await compareHash(password, user.data.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Dados inválidos',
        });
      }

      const token = jwt.sign(
        {
          id: user.data.id,
          name: user.data.name,
        },
        SECRET_KEY,
        { expiresIn: '2h' },
      );

      res.status(200).json({
        success: true,
        message: 'Login realizado com sucesso.',
        token: token,
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
