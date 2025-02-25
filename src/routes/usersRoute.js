const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const { usersController } = require('../controllers/usersController');

router.get('/', usersController.getAllUsers);
router.get('/user', authenticate, usersController.getUser);
router.post('/', usersController.createUser);
router.put('/:userId', usersController.updateUser);
router.delete('/:userId', usersController.deleteUser);

module.exports = router;
