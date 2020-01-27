var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');
var authController = require('../controllers/authController');

router.get('/login', userController.login_Form);
router.post('/login', userController.login);
router.get('/register', userController.register_Form);
router.post('/register', userController.register);
router.get('/logout', userController.logout);

module.exports = router;