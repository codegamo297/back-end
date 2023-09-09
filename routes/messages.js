const router = require('express').Router();

const MessageController = require('../app/controllers/MessageController');

// Add message (create message)
router.post('/', MessageController.add);
// Get message
router.get('/:conversationId', MessageController.get);

module.exports = router;
