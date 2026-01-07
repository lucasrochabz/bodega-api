import express from 'express';
import { loginLimiter } from '../middlewares/loginLimiter.js';
import { validateQuery } from '../middlewares/validateQuery.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginSchema } from '../schemas/auth/loginSchema.js';
import { forgotPasswordSchema } from '../schemas/auth/forgotPasswordSchema.js';
import { tokenSchema } from '../schemas/auth/tokenSchema.js';
import { resetPasswordSchema } from '../schemas/auth/resetPasswordSchema.js';
import { authController } from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();
// fix: add rota '/me'
router.get('/me', authenticate, authController.getMe);

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
