import { authService } from '../services/authService.js';

export const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const userResult = await authService.login({ email, password });

      if (!userResult.success) {
        return res.status(401).json(userResult);
      }

      res.status(200).json(userResult);
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao realizar login.',
      });
    }
  },
};
