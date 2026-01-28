import express from 'express';
import { authenticateUser } from '../middlewares/authMiddleware.js';
import { loginLimiter } from '../middlewares/loginLimiter.js';
import { validateBody } from '../middlewares/validateBody.js';
import { validateQuery } from '../middlewares/validateQuery.js';
import { loginSchema } from '../schemas/auth/loginSchema.js';
import { forgotPasswordSchema } from '../schemas/auth/forgotPasswordSchema.js';
import { tokenSchema } from '../schemas/auth/tokenSchema.js';
import { resetPasswordSchema } from '../schemas/auth/resetPasswordSchema.js';
import { authController } from '../controllers/authController.js';

const router = express.Router();

// fix: add rota de refresh depois

router.get('/me', authenticateUser, authController.getMe);

router.post(
  '/login',
  loginLimiter,
  validateBody(loginSchema),
  authController.login,
);
router.post(
  '/forgot-password',
  validateBody(forgotPasswordSchema),
  authController.forgotPassword,
);
router.post(
  '/reset-password',
  validateQuery(tokenSchema),
  validateBody(resetPasswordSchema),
  authController.resetPassword,
);

export default router;
