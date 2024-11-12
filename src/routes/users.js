const express = require('express');
const router = express.Router();
const { usersController } = require('../controllers/usersController');

router.get('/', usersController.listAllUsers);
router.get('/:userId', usersController.getUser);
router.post('/', usersController.createUser);
router.put('/:userId', usersController.updateUser);
router.delete('/:userId', usersController.deleteUser);

module.exports = router;
