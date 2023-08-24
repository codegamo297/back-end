const AuthorController = require('../app/controllers/AuthorController');

const router = require('express').Router();

// Register
router.post('/register', AuthorController.register);
// Login
router.post('/login', AuthorController.login);

module.exports = router;
