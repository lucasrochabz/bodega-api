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

  forgotPassword: async (req, res) => {
    const { email } = req.body;
    try {
      const result = await authService.forgotPassword(email);
      handleServiceResponse(res, result, 200, 401);
    } catch (error) {
      console.error(
        'Erro ao processar a solicitação de recuperação de senha:',
        error,
      );
      res.status(500).json({
        success: false,
        message: 'Erro ao processar a solicitação de recuperação de senha.',
      });
    }
  },

  resetPassword: async (req, res) => {
    const { token } = req.query;
    const { newPassword } = req.body;
    try {
      const result = await authService.resetPassword({ token, newPassword });
      handleServiceResponse(res, result, 200, 401);
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao redefinir senha.',
      });
    }
  },
};
