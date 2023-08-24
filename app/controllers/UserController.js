const Users = require('../models/User');

const UserController = {
    show: async (req, res) => {
        try {
            res.send('hey its user route');
        } catch (error) {
            res.status(500).json(err);
        }
    },
};

module.exports = UserController;
