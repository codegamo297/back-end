const User = require('../models/User');
const bcrypt = require('bcrypt');

const AuthorController = {
    // Register, POST:/register
    register: async (req, res) => {
        try {
            // Generate new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            // Create new user
            const newUser = await new User({
                userName: req.body.userName,
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.profilePicture,
            });

            // Save user and respond
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    // Login, POST: /login
    login: async (req, res) => {
        try {
            // Find password
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(404).send('User not found');
            }

            // To check a password
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(400).json('wrong password');
            }

            res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
};

module.exports = AuthorController;
