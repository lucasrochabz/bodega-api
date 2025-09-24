import { authService } from '../services/authService.js';
import handleServiceResponse from '../helpers/handleServiceResponse.js';

export const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const userResult = await authService.login({ email, password });
      handleServiceResponse(res, userResult, 200, 401);
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao realizar login.',
      });
    }
  },
};
