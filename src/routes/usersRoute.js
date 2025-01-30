const express = require('express');
const router = express.Router();
const { usersController } = require('../controllers/usersController');
const authenticate = require('../middlewares/usersMiddlewares');

router.get('/', usersController.listAllUsers);
router.get('/user', authenticate, usersController.getUser);
router.post('/', usersController.createUser);
router.put('/:userId', usersController.updateUser);
router.delete('/:userId', usersController.deleteUser);

module.exports = router;
