const router = require('express').Router();

const PostController = require('../app/controllers/PostController');

// Create a post
router.post('/', PostController.create);
// Update a post
router.put('/:id', PostController.update);
// Delete a post
router.delete('/:id', PostController.delete);
// Like / dislike a post
router.put('/:id/like', PostController.like);
// Get a post
router.get('/:id', PostController.get);
// Get timeline posts
router.get('/timeline/:userId', PostController.getTimeline);
// // // Get user's all posts
router.get('/profile/:userName', PostController.getUserAllPosts);

module.exports = router;
