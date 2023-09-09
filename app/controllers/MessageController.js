const Message = require('../models/Message');

const MessageController = {
    add: async (req, res) => {
        const newMessage = new Message(req.body);

        try {
            const savedMessage = await newMessage.save();
            res.status(200).json(savedMessage);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    get: async (req, res) => {
        try {
            const messages = await Message.find({
                conversationId: req.params.conversationId,
            });
            res.status(200).json(messages);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
};

module.exports = MessageController;
