const express = require('express');
const router = express.Router();
const { authsController } = require('../controllers/authsController');

router.get('/login', authsController.login);

module.exports = router;
