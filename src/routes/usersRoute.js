import express from 'express';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserSchema } from '../schemas/users/updateUserSchema.js';
import { createUserSchema } from '../schemas/users/createUserSchema.js';
import { usersController } from '../controllers/usersController.js';

const router = express.Router();

router.get('/', authenticate, authorizeAdmin, usersController.getAllUsers);

// fix: essa rota deve receber '/:id' apos o user para o admin poder utilizar
router.get('/user', authenticate, usersController.getUser);

router.post('/', validateBody(createUserSchema), usersController.createUser);

router.patch(
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
