import { authService } from '../services/authService.js';
import { compareHash } from '../utils/hashUtils.js';
import { generateToken } from '../utils/tokenUtils.js';
import User from '../models/usersModel.js';

export const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const userResult = await authService.verifyUserInDB({ email });

      if (!userResult.success) {
        return res.status(401).json({
          success: false,
          message: userResult.message,
        });
      }
      const user = new User(userResult.data);

      const isPasswordValid = await compareHash(password, user.password);

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
