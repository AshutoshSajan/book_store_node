var express = require('express');
var router = express.Router();
var apiController = require('../../controllers/apiControllers/authorApi');
var authController = require('../../controllers/authController');

router.get('/', apiController.All_Authors);
router.post('/', apiController.create_Author);

router.get('/:id', apiController.get_Author);
router.put('/:id', apiController.update_Author);
router.get('/:id/books', apiController.get_Author_Books);


router.delete('/:id', apiController.delete_Author);

module.exports = router;