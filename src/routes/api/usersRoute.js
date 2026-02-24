import express from 'express';
import {
  authenticateUser,
  authorizeAdmin,
} from '../../middlewares/authMiddleware.js';
import { validate } from '../../middlewares/validate.js';
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

router.post(
  '/',
  validate({ body: createUserSchema }),
  usersController.createUser,
);

router.patch(
  '/update',
  authenticateUser,
  validate({ body: updateUserSchema }),
  usersController.updateUserById,
);

router.delete(
  '/:userId',
  authenticateUser,
  authorizeAdmin,
  usersController.deleteUserById,
);

export default router;
