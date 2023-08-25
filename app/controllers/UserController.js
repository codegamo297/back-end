const bcrypt = require('bcrypt');
const User = require('../models/User');

const UserController = {
    update: async (req, res) => {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            // Hash password
            if (req.body.password) {
                try {
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password, salt);
                } catch (error) {
                    return res.status(500).json(error);
                }
            }

            try {
                const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
                res.status(200).json('Account has been updated');
            } catch (error) {
                return res.status(500).json(error);
            }
        } else {
            return res.status(403).json('You can update only your account');
        }
    },
    delete: async (req, res) => {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            try {
                // const user = await User.deleteOne({ _id: req.params.id });
                const user = await User.findByIdAndDelete(req.params.id);
                res.status(200).json('Account has been deleted');
            } catch (error) {
                return res.status(500).json(error);
            }
        } else {
            return res.status(403).json('You can deleted only your account');
        }
    },
    get: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const { password, updatedAt, ...other } = user._doc;
            user ? res.status(200).json(other) : res.status(404).send('User not found');
        } catch (error) {
            return res.status(500).json(error);
        }
    },
};

module.exports = UserController;
