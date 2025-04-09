const { authService } = require('../services/authService');
const { compareHash } = require('../utils/hashUtils');
const { generateToken } = require('../utils/tokenUtils');
const User = require('../models/usersModel');

const authController = {
  login: async (req, res) => {
    const { email, password: plainPassword } = req.body;
    try {
      const userResult = await authService.verifyUserInDB({ email });

      if (!userResult.success) {
        return res.status(401).json({
          success: false,
          message: userResult.message,
        });
      }
      const user = new User(userResult.data);

      const isPasswordValid = await compareHash(plainPassword, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'E-mail ou senha incorretos',
        });
      }

      const token = generateToken(user);

      res.status(200).json({
        success: true,
        message: 'Login realizado com sucesso.',
        token: token,
        name: user.name,
      });
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao realizar login.',
      });
    }
  },
};

module.exports = { authController };
