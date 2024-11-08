const express = require('express');
const router = express.Router();
const { usersController } = require('../controllers/usersController');

router.get('/', usersController.listAll);
router.get('/:userId', usersController.listOne);
router.post('/', usersController.createOne);
router.put('/:userId', usersController.updateOne);
router.delete('/:userId', usersController.deleteOne);

module.exports = router;
