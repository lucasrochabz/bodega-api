const express = require('express');
const router = express.Router();
const { usersController } = require('../controllers/usersController');

router.get('/', usersController.listAll);
router.get('/:userId', usersController.listOne);
router.post('/', usersController.createOne);

module.exports = router;
