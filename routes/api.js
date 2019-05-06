var express = require('express');
var router = express.Router();
var apiController = require('../controllers/apiController.js');
var authController = require('../controllers/authController');

router.get('/books', authController.isUserLoggedIn, apiController.All_Books);
router.get('/:name/books', authController.isUserLoggedIn, apiController.single_Book);
router.get('/authors', authController.isUserLoggedIn, authController.isAuthorLoggedIn, apiController.authors);
router.get('/:name/authors', authController.isUserLoggedIn, authController.isAuthorLoggedIn, apiController.single_Author);
router.get('/users', authController.isUserLoggedIn, apiController.users);
router.get('/:name/users', authController.isUserLoggedIn, apiController.single_User);

module.exports = router;