var express = require('express');
var router = express.Router();
var cartController = require('../controllers/cartController.js');
var authController = require('../controllers/authController');
// authController.isUserLoggedIn,

router.get('/', authController.isUserLoggedIn, cartController.show_Cart);
router.post('/add-item', authController.isUserLoggedIn, cartController.add_Items);
router.get('/:id/edit-item',authController.isUserLoggedIn, cartController.edit_Item);
router.post('/:id/update-item',authController.isUserLoggedIn, cartController.update_Item);
router.get('/:id/remove-item', authController.isUserLoggedIn, cartController.remove_Item);
// router.get('/order',authController.isUserLoggedIn, cartController.order);

module.exports = router;
