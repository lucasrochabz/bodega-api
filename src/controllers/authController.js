import { authService } from '../services/authService.js';
import { handleResponse } from '../helpers/handleResponse.js';
import { handleError } from '../helpers/handleError.js';
import { CommonErrors } from '../errors/commonErrors.js';

export const authController = {
  getMe: async (req, res) => {
    const userId = req.user.id;
    try {
      const result = await authService.getMe(userId);
      handleResponse(res, result, 200);
    } catch (error) {
      console.error('Erro buscar dados do usuário.', error);
      return handleError(res, CommonErrors.INTERNAL_SERVER_ERROR);
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const userResult = await authService.login({ email, password });
      handleResponse(res, userResult, 200);
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      return handleError(res, CommonErrors.INTERNAL_SERVER_ERROR);
    }
  },

  forgotPassword: async (req, res) => {
    const { email, origin } = req.body;
    try {
      const result = await authService.forgotPassword({ email, origin });

      return res.status(200).json(result);
    } catch (error) {
      console.error('Erro ao processar a recuperação de senha:', error);
      return handleError(res, CommonErrors.INTERNAL_SERVER_ERROR);
    }
  },

  resetPassword: async (req, res) => {
    const { token } = req.query;
    const { newPassword } = req.body;
    try {
      const result = await authService.resetPassword({ token, newPassword });
      handleResponse(res, result, 200);
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      return handleError(res, CommonErrors.INTERNAL_SERVER_ERROR);
    }
  },
};
