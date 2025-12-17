import express from 'express';
import { loginLimiter } from '../middlewares/loginLimiter.js';
import { validateQuery } from '../middlewares/validateQuery.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginSchema } from '../schemas/loginSchema.js';
import { forgotPasswordSchema } from '../schemas/forgotPasswordSchema.js';
import { tokenSchema } from '../schemas/tokenSchema.js';
import { resetPasswordSchema } from '../schemas/resetPasswordSchema.js';
import { authController } from '../controllers/authController.js';

const router = express.Router();

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
