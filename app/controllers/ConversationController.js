const Conversation = require('../models/Conversation');

const ConversationController = {
    newChat: async (req, res) => {
        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId],
        });
        try {
            const savedConversation = await newConversation.save();
            res.status(200).json(savedConversation);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    get: async (req, res) => {
        try {
            const conversation = await Conversation.find({
                members: { $in: [req.params.userId] },
            });
            res.status(200).json(conversation);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    getConversationInUserId: async (req, res) => {
        try {
            const conversation = await Conversation.findOne({
                members: { $all: [req.params.firstUserId, req.params.secondUserId] },
            });
            res.status(200).json(conversation);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
};

module.exports = ConversationController;
