const router = require('express').Router();

const UserController = require('../app/controllers/UserController');

// Update user
router.put('/:id', UserController.update);
// Delete user
router.delete('/:id', UserController.delete);
// Get user
router.get('/', UserController.get);
// Following a user
router.put('/:id/follow', UserController.follow);
// UnFollowing a user
router.put('/:id/unfollow', UserController.unFollow);

module.exports = router;
