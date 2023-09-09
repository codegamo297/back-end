const router = require('express').Router();

const ConversationController = require('../app/controllers/ConversationController');

// New conversation
router.post('/', ConversationController.newChat);
// Get conversation
router.get('/:userId', ConversationController.get);
// Get conversation includes userId
router.get('/find/:firstUserId/:secondUserId', ConversationController.getConversationInUserId);

module.exports = router;
