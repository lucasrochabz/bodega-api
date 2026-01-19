import { authService } from '../services/authService.js';
import { handleServiceResponse } from '../helpers/handleServiceResponse.js';
import { CommonErrors } from '../errors/commonErrors.js';

export const authController = {
  getMe: async (req, res) => {
    const userId = req.user.id;
    try {
      const result = await authService.getMe(userId);
      handleServiceResponse(res, result, 200);
    } catch (error) {
      console.error('Erro buscar dados do usuário.', error);

      const { statusCode, message } = CommonErrors.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).json({
        success: false,
        message,
      });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const userResult = await authService.login({ email, password });
      handleServiceResponse(res, userResult, 200);
    } catch (error) {
      console.error('Erro ao realizar login:', error);

      const { statusCode, message } = CommonErrors.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).json({
        success: false,
        message,
      });
    }
  },

  forgotPassword: async (req, res) => {
    const { email, origin } = req.body;
    try {
      const result = await authService.forgotPassword({ email, origin });

      return res.status(200).json(result);
    } catch (error) {
      console.error('Erro ao processar a recuperação de senha:', error);

      const { statusCode, message } = CommonErrors.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).json({
        success: false,
        message,
      });
    }
  },

  resetPassword: async (req, res) => {
    const { token } = req.query;
    const { newPassword } = req.body;
    try {
      const result = await authService.resetPassword({ token, newPassword });
      handleServiceResponse(res, result, 200);
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);

      const { statusCode, message } = CommonErrors.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).json({
        success: false,
        message,
      });
    }
  },
};
