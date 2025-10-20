import express from 'express';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserSchema } from '../schemas/updateUserSchema.js';
import { usersController } from '../controllers/usersController.js';

const router = express.Router();

router.get('/', authenticate, authorizeAdmin, usersController.getAllUsers);
router.get('/user', authenticate, usersController.getUser);

router.post('/', usersController.createUser);

router.put(
  '/update',
  authenticate,
  validateBody(updateUserSchema),
  usersController.updateUser,
);

router.delete(
  '/:userId',
  authenticate,
  authorizeAdmin,
  usersController.deleteUser,
);

export default router;
