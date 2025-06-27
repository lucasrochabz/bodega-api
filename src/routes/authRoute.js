import express from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { loginSchema } from '../schemas/loginSchema.js';
import { authController } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', validateBody(loginSchema), authController.login);

export default router;
