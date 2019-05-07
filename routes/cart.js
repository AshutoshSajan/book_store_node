var express = require('express');
var router = express.Router();
var cartController = require('../controllers/cartController.js');
var authController = require('../controllers/authController');

router.post('/', authController.isUserLoggedIn, cartController.add_Items);
router.get('/:id/edit-item',authController.isUserLoggedIn, cartController.edit_Item);
router.post('/:id/update-item',authController.isUserLoggedIn, cartController.update_Item);
router.get('/:id/remove-item', authController.isUserLoggedIn, cartController.remove_Item);

module.exports = router;
