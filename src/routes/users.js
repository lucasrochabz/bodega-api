const express = require('express');
const router = express.Router();
const { usersController } = require('../controllers/usersController');

router.get('/', usersController.listAll);
router.get('/:userId', usersController.listOne);

module.exports = router;
