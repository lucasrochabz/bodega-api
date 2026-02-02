import { authService } from '../services/authService.js';
import { handleResponse } from '../helpers/handleResponse.js';
import { handleError } from '../helpers/handleError.js';

export const authController = {
  getMe: async (req, res) => {
    const userId = req.user.id;
    try {
      const result = await authService.getMe(userId);
      return handleResponse(
        res,
        { message: 'Usuário encontrado com sucesso.', data: result },
        200,
      );
    } catch (error) {
      console.error('Erro buscar dados do usuário.', error);
      return handleError(res, error);
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await authService.login({ email, password });
      return handleResponse(
        res,
        { message: 'Login realizado com sucesso.', token: result },
        200,
      );
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      return handleError(res, error);
    }
  },

  forgotPassword: async (req, res) => {
    const { email, origin } = req.body;
    try {
      const result = await authService.forgotPassword({ email, origin });
      return handleResponse(
        res,
        {
          message:
            'Se o e-mail estiver cadastrado, enviaremos um link de redefinição.',
          token: result,
        },
        200,
      );
    } catch (error) {
      console.error('Erro ao processar a recuperação de senha:', error);
      return handleError(res, error);
    }
  },

  resetPassword: async (req, res) => {
    const { token } = req.query;
    const { newPassword } = req.body;
    try {
      const result = await authService.resetPassword({ token, newPassword });
      return handleResponse(
        res,
        { message: 'Senha redefinida com sucesso.' },
        200,
      );
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      return handleError(res, error);
    }
  },
};
