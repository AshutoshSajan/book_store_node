var express = require('express');
var router = express.Router();
var cartController = require('../controllers/cartController.js');
var authController = require('../controllers/authController');
// authController.isUserLoggedIn,

router.get('/', authController.isUserLoggedIn, cartController.show_Cart);
router.post('/add-item', authController.isUserLoggedIn, cartController.add_Items);
// router.get('/remove-item', authController.isUserLoggedIn, cartController.remove_Items);
// router.post('/edit-item',authController.isUserLoggedIn, cartController.edit_Items);
// router.get('/order',authController.isUserLoggedIn, cartController.order);

module.exports = router;
