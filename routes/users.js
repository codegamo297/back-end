const UserController = require('../app/controllers/UserController');

const router = require('express').Router();

router.get('/', UserController.show);

module.exports = router;
