var express = require('express');
var router = express.Router();
var apiController = require('../../controllers/apiControllers/bookApi');
var authController = require('../../controllers/authController');

router.get('/', apiController.All_Books);
router.post('/', apiController.create_Book);

router.get('/:id', apiController.get_Book);
router.put('/:id', apiController.update_Book);

router.delete('/:id', apiController.delete_Book);

module.exports = router;