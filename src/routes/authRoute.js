import express from 'express';
import { validateLogin } from '../middlewares/loginMiddleware.js';
import { authController } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', validateLogin, authController.login);

export default router;
