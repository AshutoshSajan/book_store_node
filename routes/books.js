var express = require('express');
var router = express.Router();
var bookController = require('../controllers/bookController.js');

router.get('/', bookController.book_Form);
router.post('/', bookController.add_Book);
router.get('/:id/delete', bookController.delete_Book);
router.get('/:id/edit', bookController.edit_Book);
router.post('/:id/update', bookController.update_Book);
router.get('/:id/details', bookController.book_Details);

module.exports = router;
