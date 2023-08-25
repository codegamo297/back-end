const router = require('express').Router();

const UserController = require('../app/controllers/UserController');

// Update user
router.put('/:id', UserController.update);
// Delete user
router.delete('/:id', UserController.delete);
// Get user
router.get('/:id', UserController.get);
// Following a user

// UnFollowing a user

module.exports = router;
