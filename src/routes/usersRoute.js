const express = require('express');
const router = express.Router();
const {
  authenticate,
  authorizeAdmin,
} = require('../middlewares/authMiddleware');
const { validateUserUpdate } = require('../middlewares/userMiddleware');
const { usersController } = require('../controllers/usersController');

router.get('/', authenticate, authorizeAdmin, usersController.getAllUsers);
router.get('/user', authenticate, usersController.getUser);
router.post('/', usersController.createUser);
router.put(
  '/update',
  authenticate,
  validateUserUpdate,
  usersController.updateUser,
);
router.delete('/:userId', usersController.deleteUser);

module.exports = router;
