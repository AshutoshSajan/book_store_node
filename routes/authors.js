var express = require('express');
var router = express.Router();
var authorController = require('../controllers/authorController.js');
var authController = require('../controllers/authController.js');

router.get('/', authController.isUserLoggedIn, authorController.authors_Form);
router.post('/', authController.isUserLoggedIn, authorController.add_Authors);
router.get('/books', authorController.list_Books);
router.get('/:id/books', authorController.author_Books);
router.get('/:id/edit', authorController.edit_Author);
router.post('/:id/update', authorController.update_Author);
router.get('/:id/delete', authorController.delete_Author);

module.exports = router;
