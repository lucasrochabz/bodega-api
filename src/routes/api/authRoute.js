import express from 'express';
import { authenticateUser } from '../../middlewares/authMiddleware.js';
import { loginLimiter } from '../../middlewares/loginLimiter.js';
import { validate } from '../../middlewares/validate.js';
import {
  loginSchema,
  forgotPasswordSchema,
  tokenSchema,
  resetPasswordSchema,
} from '../../schemas/auth/index.js';
import { authController } from '../../controllers/authController.js';

const router = express.Router();

// fix: add rota de refresh depois

router.get('/me', authenticateUser, authController.getMe);

router.post(
  '/login',
  loginLimiter,
  validate({ body: loginSchema }),
  authController.login,
);
router.post(
  '/forgot-password',
  validate({ body: forgotPasswordSchema }),
  authController.forgotPassword,
);
router.post(
  '/reset-password',
  validate({ query: tokenSchema }),
  validate({ body: resetPasswordSchema }),
  authController.resetPassword,
);

export default router;
