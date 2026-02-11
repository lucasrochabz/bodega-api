import express from 'express';
import {
  authenticateUser,
  authorizeAdmin,
} from '../../middlewares/authMiddleware.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { updateUserSchema } from '../../schemas/users/updateUserSchema.js';
import { createUserSchema } from '../../schemas/users/createUserSchema.js';
import { usersController } from '../../controllers/usersController.js';

const router = express.Router();

router.get('/', authenticateUser, authorizeAdmin, usersController.getAllUsers);
router.get(
  '/:userId',
  authenticateUser,
  authorizeAdmin,
  usersController.getUserById,
);

router.post('/', validateBody(createUserSchema), usersController.createUser);

router.patch(
  '/update',
  authenticateUser,
  validateBody(updateUserSchema),
  usersController.updateUser,
);

router.delete(
  '/:userId',
  authenticateUser,
  authorizeAdmin,
  usersController.deleteUser,
);

export default router;
