import express from 'express';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import { validateUserUpdate } from '../middlewares/userMiddleware.js';
import { usersController } from '../controllers/usersController.js';

const router = express.Router();

router.get('/', authenticate, authorizeAdmin, usersController.getAllUsers);
router.get('/user', authenticate, usersController.getUser);
router.post('/', usersController.createUser);
router.put(
  '/update',
  authenticate,
  validateUserUpdate,
  usersController.updateUser,
);
router.delete(
  '/:userId',
  authenticate,
  authorizeAdmin,
  usersController.deleteUser,
);

export default router;
