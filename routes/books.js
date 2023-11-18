var express = require('express');
var router = express.Router();
var bookController = require('../controllers/bookController.js');
var authController = require('../controllers/authController.js');

router.get('/', authController.isAuthorLoggedIn, bookController.book_Form);

router.post('/', authController.isAuthorLoggedIn, bookController.add_Book);

router.get(
  '/:id/delete',
  authController.isAuthorLoggedIn,
  bookController.delete_Book
);

router.get(
  '/:id/edit',
  authController.isAuthorLoggedIn,
  bookController.edit_Book
);

router.post(
  '/:id/update',
  authController.isAuthorLoggedIn,
  bookController.update_Book
);

router.get('/:id/details', bookController.book_Details);

module.exports = router;
